<?php

/**
 * Contact endpoint settings. These are the only values to review after buying the
 * hosting space; contatti.php itself needs no changes.
 */

return [
    // Where enquiries are delivered. Add more addresses to send copies.
    'recipients' => ['info@contactsrl.net'],

    // Envelope sender. It MUST be a mailbox of the hosted domain: providers reject
    // (or spam-folder) messages sent on behalf of an address they do not host.
    'sender' => [
        'email' => 'sito@contactsrl.net',
        'name' => 'Sito Contact SRL',
    ],

    'subjectPrefix' => '[contactsrl.net]',

    // Pass the sender as envelope-from to mail(). Set to false if the host refuses
    // the extra parameter, which makes mail() return false for every message.
    'useEnvelopeSender' => true,

    // Submissions filled in faster than this are delivered with a "possibile spam"
    // subject rather than dropped, since browser autofill can be very quick.
    // 0 disables the check.
    'minElapsedMs' => 1200,

    // Per IP address, kept in the system temp directory. 0 disables.
    'rateLimit' => [
        'maxPerWindow' => 5,
        'windowSeconds' => 3600,
    ],

    // Written when delivery fails (and for every message while dryRun is on), so an
    // enquiry is never lost. '' disables it.
    'logFile' => __DIR__ . '/storage/contact.log',

    // Local testing: true logs the message instead of sending it.
    'dryRun' => false,
];
