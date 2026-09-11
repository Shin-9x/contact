/**
 * Local stand-in for public/api/contatti.php: same contract, no PHP and no mail
 * server. Started by `npm run dev:api`; the Vite dev server proxies /api to it.
 *
 * Add ?simulate=error|rate-limit|slow to VITE_CONTACT_ENDPOINT to exercise the
 * failure states of the form.
 */

import { createServer } from 'node:http'

const PORT = Number(process.env.PORT ?? 8787)
const MAX_BODY_BYTES = 32768
const LIMITS = { name: 120, email: 160, phone: 32, message: 4000 }
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE = /^[0-9+()./\s-]{6,32}$/

function validate(enquiry) {
  const errors = {}
  const value = (key) => String(enquiry?.[key] ?? '').trim()

  if (!value('name')) errors.name = 'required'
  else if (value('name').length > LIMITS.name) errors.name = 'tooLong'

  if (!value('email')) errors.email = 'required'
  else if (value('email').length > LIMITS.email) errors.email = 'tooLong'
  else if (!EMAIL.test(value('email'))) errors.email = 'invalidEmail'

  if (value('phone') && !PHONE.test(value('phone'))) errors.phone = 'invalidPhone'
  if (value('message').length > LIMITS.message) errors.message = 'tooLong'
  if (enquiry?.consent !== true) errors.consent = 'consent'

  return errors
}

function send(response, status, payload) {
  const body = JSON.stringify(payload)
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  response.end(body)
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    request.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body_too_large'))
        request.destroy()
        return
      }
      chunks.push(chunk)
    })
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    request.on('error', reject)
  })
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:${PORT}`)

  if (request.method !== 'POST') {
    send(response, 405, { ok: false, error: 'method_not_allowed' })
    return
  }

  let enquiry
  try {
    enquiry = JSON.parse(await readBody(request))
  } catch {
    send(response, 400, { ok: false, error: 'invalid_json' })
    return
  }

  const simulate = url.searchParams.get('simulate')
  if (simulate === 'slow') await new Promise((resolve) => setTimeout(resolve, 3000))
  if (simulate === 'rate-limit') {
    send(response, 429, { ok: false, error: 'rate_limited' })
    return
  }
  if (simulate === 'error') {
    send(response, 500, { ok: false, error: 'delivery_failed' })
    return
  }

  const errors = validate(enquiry)
  if (Object.keys(errors).length > 0) {
    send(response, 422, { ok: false, errors })
    return
  }

  if (enquiry.website) {
    console.log('[contact-mock] honeypot filled: discarded silently')
    send(response, 200, { ok: true })
    return
  }

  console.log(
    [
      '',
      '--- enquiry received ' + new Date().toLocaleString('it-IT'),
      `type:     ${enquiry.type === 'candidate' ? 'candidate' : 'business'}`,
      `name:     ${enquiry.name}`,
      `email:    ${enquiry.email}`,
      `phone:    ${enquiry.phone || '-'}`,
      `language: ${enquiry.language}`,
      `elapsed:  ${enquiry.elapsedMs} ms${enquiry.elapsedMs < 1200 ? ' (flagged as possible spam)' : ''}`,
      'message:',
      enquiry.message || '-',
      '---',
    ].join('\n'),
  )

  send(response, 200, { ok: true })
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[contact-mock] listening on http://127.0.0.1:${PORT} — enquiries are printed here`)
})
