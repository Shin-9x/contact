export type EnquiryType = 'business' | 'candidate'

export interface Enquiry {
  type: EnquiryType
  name: string
  email: string
  phone: string
  message: string
  language: string
}

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

/** False until an API endpoint is wired up in `.env` — see `.env.example`. */
export const isContactEndpointConfigured = Boolean(endpoint)

/**
 * Posts an enquiry as JSON to `VITE_CONTACT_ENDPOINT`. Any backend that accepts a
 * JSON body (a PHP script on the Aruba space, a form service, an API) can be plugged
 * in without touching the components.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  if (!endpoint) {
    throw new Error('VITE_CONTACT_ENDPOINT is not configured')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  })

  if (!response.ok) {
    throw new Error(`Contact endpoint responded with ${response.status}`)
  }
}
