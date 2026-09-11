<?php

/**
 * Contact form endpoint for the Contact SRL site.
 *
 * Validates a JSON enquiry and emails it to the addresses in config.php. No database
 * and no dependencies, so it runs as-is on shared Linux hosting (PHP 7.4+).
 *
 * Request : POST application/json
 *           {type,name,email,phone,message,consent,language,website,elapsedMs}
 * Response: 200 {"ok":true}
 *           422 {"ok":false,"errors":{"<field>":"<code>"}}  same codes as the client
 *           429 rate limited | 405 wrong method | 413 body too large
 *           400 malformed JSON | 500 delivery failed
 */

declare(strict_types=1);

// A warning printed before the JSON would make the response unparsable for the
// browser; errors still reach the host's PHP log.
ini_set('display_errors', '0');
error_reporting(E_ALL);

$config = require __DIR__ . '/config.php';

define('MAX_BODY_BYTES', 32768);
define('LIMIT_NAME', 120);
define('LIMIT_EMAIL', 160);
define('LIMIT_PHONE', 32);
define('LIMIT_MESSAGE', 4000);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/**
 * Sends the response and stops. Always JSON, so the client can parse any outcome.
 */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Reads one field as a trimmed UTF-8 string, dropping control characters. */
function readField(array $data, string $key): string
{
    $value = isset($data[$key]) && is_scalar($data[$key]) ? (string) $data[$key] : '';
    if ($value === '') {
        return '';
    }
    if (function_exists('mb_check_encoding') && !mb_check_encoding($value, 'UTF-8')) {
        return '';
    }
    $cleaned = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value);

    return trim($cleaned === null ? '' : $cleaned);
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

/** Mirrors src/services/enquiryValidation.ts, including the issue codes. */
function validate(array $enquiry): array
{
    $errors = [];

    if ($enquiry['name'] === '') {
        $errors['name'] = 'required';
    } elseif (textLength($enquiry['name']) > LIMIT_NAME) {
        $errors['name'] = 'tooLong';
    }

    if ($enquiry['email'] === '') {
        $errors['email'] = 'required';
    } elseif (textLength($enquiry['email']) > LIMIT_EMAIL) {
        $errors['email'] = 'tooLong';
    } elseif (filter_var($enquiry['email'], FILTER_VALIDATE_EMAIL) === false) {
        $errors['email'] = 'invalidEmail';
    }

    if ($enquiry['phone'] !== '' && preg_match('/^[0-9+().\/\s-]{6,32}$/', $enquiry['phone']) !== 1) {
        $errors['phone'] = 'invalidPhone';
    }

    if (textLength($enquiry['message']) > LIMIT_MESSAGE) {
        $errors['message'] = 'tooLong';
    }

    if ($enquiry['consent'] !== true) {
        $errors['consent'] = 'consent';
    }

    return $errors;
}

function clientIp(): string
{
    return isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : 'unknown';
}

/**
 * Per-IP throttle backed by a file in the system temp directory: the hosting plan has
 * no database, and a cleaned-up temp file simply resets the counter.
 */
function rateLimitPath(): string
{
    return rtrim(sys_get_temp_dir(), '/\\') . '/contactsrl-rl-' . hash('sha256', clientIp());
}

/** Timestamps of the accepted submissions still inside the window. */
function recentHits(int $window): array
{
    $path = rateLimitPath();
    if (!is_readable($path)) {
        return [];
    }

    $decoded = json_decode((string) file_get_contents($path), true);
    if (!is_array($decoded)) {
        return [];
    }

    $threshold = time() - $window;
    $hits = [];
    foreach ($decoded as $timestamp) {
        if (is_int($timestamp) && $timestamp > $threshold) {
            $hits[] = $timestamp;
        }
    }

    return $hits;
}

function rateLimitReached(array $limit): bool
{
    $max = (int) $limit['maxPerWindow'];
    $window = (int) $limit['windowSeconds'];

    return $max > 0 && $window > 0 && count(recentHits($window)) >= $max;
}

/** Counted on accepted submissions only, so typos never lock a visitor out. */
function recordHit(array $limit): void
{
    $window = (int) $limit['windowSeconds'];
    if ((int) $limit['maxPerWindow'] <= 0 || $window <= 0) {
        return;
    }

    $hits = recentHits($window);
    $hits[] = time();
    @file_put_contents(rateLimitPath(), json_encode($hits), LOCK_EX);
}

function encodeHeader(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

/** Header values must stay on a single line: newlines allow header injection. */
function singleLine(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function formatAddress(string $email, string $name): string
{
    $name = singleLine($name);

    return $name === '' ? $email : encodeHeader($name) . ' <' . $email . '>';
}

function typeLabel(array $enquiry): string
{
    return $enquiry['type'] === 'candidate' ? 'Candidatura' : 'Richiesta azienda';
}

function sentAtLabel(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone('Europe/Rome')))->format('d/m/Y \a\l\l\e H:i');
}

function userAgent(): string
{
    return singleLine(isset($_SERVER['HTTP_USER_AGENT']) ? (string) $_SERVER['HTTP_USER_AGENT'] : '-');
}

/** Plain-text part, and the copy written to the log while testing. */
function renderText(array $enquiry): string
{
    $lines = [
        'NUOVA ' . mb_strtoupper(typeLabel($enquiry), 'UTF-8') . ' — contactsrl.net',
        '',
        'Nome:      ' . $enquiry['name'],
        'Email:     ' . $enquiry['email'],
        'Telefono:  ' . ($enquiry['phone'] === '' ? '—' : $enquiry['phone']),
        'Lingua:    ' . ($enquiry['language'] === 'en' ? 'inglese' : 'italiano'),
        '',
        'MESSAGGIO',
        $enquiry['message'] === '' ? '(nessun messaggio)' : $enquiry['message'],
        '',
        'Rispondi a questa email per scrivere direttamente a ' . $enquiry['name'] . '.',
        '',
        str_repeat('-', 56),
        'Ricevuta il ' . sentAtLabel(),
        'IP ' . clientIp() . ' — ' . userAgent(),
    ];

    if ($enquiry['suspicious']) {
        $lines[] = 'Attenzione: modulo compilato in ' . $enquiry['elapsedMs'] . ' ms, possibile invio automatico.';
    }

    return implode("\n", $lines) . "\n";
}

/**
 * HTML part. Inline styles and a table layout on purpose: email clients strip
 * stylesheets and support little more than this.
 */
function renderHtml(array $enquiry): string
{
    $e = function (string $value): string {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    };

    $mono = "font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;";
    $sans = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";

    $rows = [
        ['Email', '<a href="mailto:' . $e($enquiry['email']) . '" style="color:#0b8ecf;text-decoration:none;">' . $e($enquiry['email']) . '</a>'],
    ];
    if ($enquiry['phone'] !== '') {
        $dialable = preg_replace('/[^0-9+]/', '', $enquiry['phone']);
        $rows[] = ['Telefono', '<a href="tel:' . $e((string) $dialable) . '" style="color:#0b8ecf;text-decoration:none;">' . $e($enquiry['phone']) . '</a>'];
    }
    $rows[] = ['Lingua', $enquiry['language'] === 'en' ? 'Inglese' : 'Italiano'];

    $fields = '';
    foreach ($rows as $row) {
        $fields .= '<tr>'
            . '<td width="104" style="' . $mono . 'width:104px;color:#12161a;opacity:.45;padding:5px 16px 10px 0;white-space:nowrap;vertical-align:top;">' . $e($row[0]) . '</td>'
            . '<td style="' . $sans . 'font-size:15px;color:#12161a;padding:0 0 10px 0;vertical-align:top;">' . $row[1] . '</td>'
            . '</tr>';
    }

    $message = $enquiry['message'] === ''
        ? '<span style="color:#12161a;opacity:.45;">Nessun messaggio.</span>'
        : nl2br($e($enquiry['message']));

    $warning = $enquiry['suspicious']
        ? '<tr><td style="padding:0 28px 20px;"><div style="' . $sans . 'font-size:13px;line-height:1.5;color:#e0479a;border:1px solid #e0479a;border-radius:6px;padding:10px 14px;">'
            . 'Modulo compilato in ' . (int) $enquiry['elapsedMs'] . ' ms: possibile invio automatico.</div></td></tr>'
        : '';

    return '<!doctype html><html lang="it"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        . '<body style="margin:0;padding:0;background:#f1f1ef;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1ef;padding:28px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e2de;border-radius:10px;">'

        // Header
        . '<tr><td style="background:#12161a;border-radius:9px 9px 0 0;padding:22px 28px;">'
        . '<div style="' . $mono . 'color:#fbfbf9;opacity:.55;">contactsrl.net</div>'
        . '<div style="' . $sans . 'font-size:20px;font-weight:600;letter-spacing:-.01em;color:#fbfbf9;padding-top:6px;">'
        . 'Nuova ' . ($enquiry['type'] === 'candidate' ? 'candidatura' : 'richiesta azienda')
        . '</div></td></tr>'

        // Name
        . '<tr><td style="padding:26px 28px 18px;">'
        . '<div style="' . $mono . 'color:#12161a;opacity:.45;">Da</div>'
        . '<div style="' . $sans . 'font-size:24px;font-weight:600;letter-spacing:-.02em;color:#12161a;padding-top:6px;">' . $e($enquiry['name']) . '</div>'
        . '</td></tr>'

        // Contact details
        . '<tr><td style="padding:0 28px 8px;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%">' . $fields . '</table></td></tr>'

        // Message
        . '<tr><td style="padding:10px 28px 22px;">'
        . '<div style="' . $mono . 'color:#12161a;opacity:.45;padding-bottom:8px;">Messaggio</div>'
        . '<div style="' . $sans . 'font-size:15px;line-height:1.6;color:#12161a;background:#fbfbf9;border-left:3px solid #0b8ecf;border-radius:0 6px 6px 0;padding:14px 16px;">'
        . $message . '</div></td></tr>'

        // Reply hint
        . '<tr><td style="padding:0 28px 22px;">'
        . '<a href="mailto:' . $e($enquiry['email']) . '" style="' . $sans . 'display:inline-block;font-size:14px;font-weight:600;color:#fbfbf9;background:#12161a;border-radius:999px;padding:12px 22px;text-decoration:none;">Rispondi a ' . $e($enquiry['name']) . '</a>'
        . '</td></tr>'

        . $warning

        // Footer
        . '<tr><td style="border-top:1px solid #eceae6;padding:16px 28px 20px;">'
        . '<div style="' . $sans . 'font-size:12px;line-height:1.6;color:#12161a;opacity:.4;">'
        . 'Ricevuta il ' . $e(sentAtLabel()) . '<br>IP ' . $e(clientIp()) . '<br>' . $e(userAgent())
        . '</div></td></tr>'

        . '</table></td></tr></table></body></html>';
}

/** Wraps the two parts as multipart/alternative, base64 encoded to stay MIME-safe. */
function buildMimeBody(string $text, string $html, string $boundary): string
{
    return implode("\n", [
        '--' . $boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk_split(base64_encode($text), 76, "\n"),
        '--' . $boundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk_split(base64_encode($html), 76, "\n"),
        '--' . $boundary . '--',
        '',
    ]);
}

function deliver(array $config, array $enquiry): bool
{
    $prefix = $config['subjectPrefix'] . ($enquiry['suspicious'] ? ' [possibile spam]' : '');
    $plainSubject = singleLine(trim($prefix . ' ' . typeLabel($enquiry) . ' — ' . $enquiry['name']));
    $text = renderText($enquiry);

    if (!empty($config['dryRun'])) {
        // The plain part on purpose: the log is what a local test is read from.
        writeLog($config, "DRY RUN\nTo: " . implode(', ', $config['recipients']) . "\nSubject: {$plainSubject}\n\n{$text}");

        return true;
    }

    $boundary = 'contactsrl-' . bin2hex(random_bytes(12));
    $headers = [
        'From: ' . formatAddress($config['sender']['email'], $config['sender']['name']),
        'Reply-To: ' . formatAddress($enquiry['email'], $enquiry['name']),
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: contactsrl-site',
    ];
    $body = buildMimeBody($text, renderHtml($enquiry), $boundary);
    $parameters = !empty($config['useEnvelopeSender']) ? '-f' . $config['sender']['email'] : '';

    $delivered = true;
    foreach ($config['recipients'] as $recipient) {
        $sent = @mail($recipient, encodeHeader($plainSubject), $body, implode("\r\n", $headers), $parameters);
        $delivered = $delivered && $sent;
    }

    return $delivered;
}

/** Best effort: a failed log must never turn into a failed response. */
function writeLog(array $config, string $entry): void
{
    $path = isset($config['logFile']) ? (string) $config['logFile'] : '';
    if ($path === '') {
        return;
    }

    $directory = dirname($path);
    if (!is_dir($directory)) {
        @mkdir($directory, 0750, true);
    }

    $stamp = (new DateTimeImmutable('now', new DateTimeZone('Europe/Rome')))->format('c');
    @file_put_contents($path, "===== {$stamp}\n{$entry}\n", FILE_APPEND | LOCK_EX);
}

// --- request handling --------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false) {
    respond(400, ['ok' => false, 'error' => 'unreadable_body']);
}
if (strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'error' => 'body_too_large']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

if (rateLimitReached($config['rateLimit'])) {
    respond(429, ['ok' => false, 'error' => 'rate_limited']);
}

$elapsedMs = isset($data['elapsedMs']) && is_numeric($data['elapsedMs']) ? (int) $data['elapsedMs'] : 0;

$enquiry = [
    'type' => readField($data, 'type') === 'candidate' ? 'candidate' : 'business',
    'name' => readField($data, 'name'),
    'email' => readField($data, 'email'),
    'phone' => readField($data, 'phone'),
    'message' => readField($data, 'message'),
    'consent' => isset($data['consent']) && $data['consent'] === true,
    'language' => readField($data, 'language') === 'en' ? 'en' : 'it',
    'elapsedMs' => $elapsedMs,
    // Faster than a person can realistically fill the form. Flagged, never dropped:
    // browser autofill can be this quick and a real enquiry must not be lost.
    'suspicious' => (int) $config['minElapsedMs'] > 0 && $elapsedMs < (int) $config['minElapsedMs'],
];

$errors = validate($enquiry);
if ($errors !== []) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

// Only a bot fills a field it cannot see. Answer with a plain success so the sender
// has nothing to tune against, and deliver nothing.
if (readField($data, 'website') !== '') {
    respond(200, ['ok' => true]);
}

recordHit($config['rateLimit']);

if (!deliver($config, $enquiry)) {
    writeLog($config, "DELIVERY FAILED\n" . renderText($enquiry));
    respond(500, ['ok' => false, 'error' => 'delivery_failed']);
}

respond(200, ['ok' => true]);
