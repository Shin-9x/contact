import type { EnquiryDraft, EnquiryType, FieldErrors, IssueCode } from './enquiryValidation'

export type { EnquiryType } from './enquiryValidation'

export interface Enquiry extends EnquiryDraft {
  type: EnquiryType
  language: string
  /** Honeypot: a real visitor never sees this field, so it must stay empty. */
  website: string
  /** Milliseconds between the form being shown and the submit. */
  elapsedMs: number
}

export type SendResult =
  | { ok: true }
  | { ok: false; reason: 'validation'; errors: FieldErrors }
  | { ok: false; reason: 'rateLimited' }
  | { ok: false; reason: 'failed' }

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

/** False until an endpoint is configured — see `.env.example`. */
export const isContactEndpointConfigured = Boolean(endpoint)

const TIMEOUT_MS = 15_000

const fieldNames = ['name', 'email', 'phone', 'message', 'consent'] as const
const issueCodes: readonly string[] = [
  'required',
  'invalidEmail',
  'invalidPhone',
  'tooLong',
  'consent',
]

/**
 * Posts an enquiry as JSON to `VITE_CONTACT_ENDPOINT` and maps the outcome to a
 * result the form can render. Any backend answering the same contract can replace
 * the bundled PHP endpoint without touching the components.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<SendResult> {
  if (!endpoint) return { ok: false, reason: 'failed' }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(enquiry),
      signal: controller.signal,
    })

    if (response.ok) return { ok: true }
    if (response.status === 429) return { ok: false, reason: 'rateLimited' }

    if (response.status === 422) {
      const errors = await readFieldErrors(response)
      if (errors) return { ok: false, reason: 'validation', errors }
    }

    return { ok: false, reason: 'failed' }
  } catch {
    // Network failure, timeout or a blocked request: all recoverable by retrying.
    return { ok: false, reason: 'failed' }
  } finally {
    window.clearTimeout(timer)
  }
}

/** Keeps only the field/code pairs the form knows how to display. */
async function readFieldErrors(response: Response): Promise<FieldErrors | null> {
  try {
    const payload: unknown = await response.json()
    const reported = (payload as { errors?: Record<string, unknown> } | null)?.errors
    if (!reported) return null

    const errors: FieldErrors = {}
    for (const field of fieldNames) {
      const code = reported[field]
      if (typeof code === 'string' && issueCodes.includes(code)) {
        errors[field] = code as IssueCode
      }
    }
    return Object.keys(errors).length > 0 ? errors : null
  } catch {
    return null
  }
}
