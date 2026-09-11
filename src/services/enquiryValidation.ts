/**
 * Shared validation rules for the contact form. The PHP endpoint in
 * `public/api/contatti.php` mirrors these limits and issue codes, so the browser and
 * the server always report the same problem for the same input.
 */

export type EnquiryType = 'business' | 'candidate'

export interface EnquiryDraft {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export type IssueCode = 'required' | 'invalidEmail' | 'invalidPhone' | 'tooLong' | 'consent'

export type FieldName = keyof EnquiryDraft

export type FieldErrors = Partial<Record<FieldName, IssueCode>>

/** Field order used to focus the first problem after a rejected submit. */
export const fieldOrder: FieldName[] = ['name', 'email', 'phone', 'message', 'consent']

export const limits = {
  name: 120,
  email: 160,
  phone: 32,
  message: 4000,
} as const

// Deliberately permissive: the mail server is the real judge of an address, and a
// stricter pattern mostly rejects valid ones.
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const phonePattern = /^[0-9+()./\s-]{6,32}$/

export function validateDraft(draft: EnquiryDraft): FieldErrors {
  const errors: FieldErrors = {}

  const name = draft.name.trim()
  if (!name) errors.name = 'required'
  else if (name.length > limits.name) errors.name = 'tooLong'

  const email = draft.email.trim()
  if (!email) errors.email = 'required'
  else if (email.length > limits.email) errors.email = 'tooLong'
  else if (!emailPattern.test(email)) errors.email = 'invalidEmail'

  const phone = draft.phone.trim()
  if (phone && !phonePattern.test(phone)) errors.phone = 'invalidPhone'

  if (draft.message.trim().length > limits.message) errors.message = 'tooLong'

  if (!draft.consent) errors.consent = 'consent'

  return errors
}
