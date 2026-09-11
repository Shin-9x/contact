import { useId, useRef, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { CheckboxField, TextAreaField, TextField } from './FormField'
import { form } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import { isContactEndpointConfigured, sendEnquiry } from '../services/contactService'
import { useEnquiryType } from '../enquiry/useEnquiryType'
import {
  fieldOrder,
  limits,
  validateDraft,
  type EnquiryDraft,
  type EnquiryType,
  type FieldErrors,
  type FieldName,
  type IssueCode,
} from '../services/enquiryValidation'

type Status = 'idle' | 'sending' | 'success' | 'invalid' | 'rateLimited' | 'error' | 'unconfigured'

const emptyDraft: EnquiryDraft = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
}

const issueMessages: Record<IssueCode, keyof typeof form.issues> = {
  required: 'required',
  invalidEmail: 'invalidEmail',
  invalidPhone: 'invalidPhone',
  tooLong: 'tooLong',
  consent: 'consent',
}

function tabClasses(isActive: boolean) {
  return `min-w-0 flex-[1_1_0] cursor-pointer rounded-full border px-[14px] py-[10px] text-[13.5px] transition-colors duration-200 ${
    isActive ? 'border-transparent bg-ink text-paper' : 'border-ink/18 text-ink/70 hover:border-ink/40'
  }`
}

export function ContactForm() {
  const { language, t } = useLanguage()
  const { type, selectType } = useEnquiryType()
  const [draft, setDraft] = useState<EnquiryDraft>(emptyDraft)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const shownAt = useRef(Date.now())
  const prefix = useId()
  const statusId = useId()

  const isBusiness = type === 'business'
  const fieldId = (name: FieldName) => `${prefix}-${name}`
  const messageFor = (name: FieldName) => {
    const issue = errors[name]
    return issue ? t(form.issues[issueMessages[issue]]) : undefined
  }

  function update<K extends FieldName>(key: K, value: EnquiryDraft[K]) {
    const next = { ...draft, [key]: value }
    setDraft(next)

    // Re-check only fields already flagged, so a message disappears as soon as the
    // visitor fixes it but none appear while they are still typing.
    if (errors[key]) {
      const nextErrors: FieldErrors = { ...errors }
      const issue = validateDraft(next)[key]
      if (issue) nextErrors[key] = issue
      else delete nextErrors[key]
      setErrors(nextErrors)
    }

    if (status !== 'sending') setStatus('idle')
  }

  function focusFirstIssue(issues: FieldErrors) {
    const first = fieldOrder.find((name) => issues[name])
    if (first) document.getElementById(fieldId(first))?.focus()
  }

  function chooseType(next: EnquiryType) {
    selectType(next)
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const issues = validateDraft(draft)
    if (Object.keys(issues).length > 0) {
      setErrors(issues)
      setStatus('invalid')
      focusFirstIssue(issues)
      return
    }
    setErrors({})

    if (!isContactEndpointConfigured) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    const result = await sendEnquiry({
      type,
      ...draft,
      language,
      website: honeypot,
      elapsedMs: Date.now() - shownAt.current,
    })

    if (result.ok) {
      setDraft(emptyDraft)
      setHoneypot('')
      shownAt.current = Date.now()
      setStatus('success')
      return
    }

    if (result.reason === 'validation') {
      setErrors(result.errors)
      setStatus('invalid')
      focusFirstIssue(result.errors)
      return
    }

    setStatus(result.reason === 'rateLimited' ? 'rateLimited' : 'error')
  }

  const statusMessage =
    status === 'success'
      ? t(form.success)
      : status === 'invalid'
        ? t(form.invalid)
        : status === 'rateLimited'
          ? t(form.rateLimited)
          : status === 'error'
            ? t(form.error)
            : status === 'unconfigured'
              ? t(form.unconfigured)
              : ''

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative grid gap-5 rounded-card border border-ink/12 bg-white p-[clamp(24px,3vw,40px)]"
    >
      <div role="group" aria-label={t(form.typeLegend)} className="flex gap-2">
        <button
          type="button"
          aria-pressed={isBusiness}
          onClick={() => chooseType('business')}
          className={tabClasses(isBusiness)}
        >
          {t(form.tabs.business)}
        </button>
        <button
          type="button"
          aria-pressed={!isBusiness}
          onClick={() => chooseType('candidate')}
          className={tabClasses(!isBusiness)}
        >
          {t(form.tabs.candidate)}
        </button>
      </div>

      <TextField
        id={fieldId('name')}
        label={t(form.fields.name)}
        error={messageFor('name')}
        type="text"
        name="name"
        autoComplete="name"
        maxLength={limits.name}
        required
        value={draft.name}
        onChange={(event) => update('name', event.target.value)}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] grid-rows-[auto_auto_auto] gap-5">
        <TextField
          subgrid
          id={fieldId('email')}
          label={t(form.fields.email)}
          error={messageFor('email')}
          type="email"
          name="email"
          autoComplete="email"
          maxLength={limits.email}
          required
          value={draft.email}
          onChange={(event) => update('email', event.target.value)}
        />
        <TextField
          subgrid
          id={fieldId('phone')}
          label={t(form.fields.phone)}
          hint={t(form.optional)}
          error={messageFor('phone')}
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={limits.phone}
          value={draft.phone}
          onChange={(event) => update('phone', event.target.value)}
        />
      </div>

      <TextAreaField
        id={fieldId('message')}
        label={t(isBusiness ? form.fields.messageBusiness : form.fields.messageCandidate)}
        error={messageFor('message')}
        name="message"
        rows={4}
        maxLength={limits.message}
        value={draft.message}
        onChange={(event) => update('message', event.target.value)}
      />

      {/* Honeypot: hidden from sight and from assistive tech, filled in only by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${prefix}-website`}>Website</label>
        <input
          id={`${prefix}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <CheckboxField
        id={fieldId('consent')}
        label={t(form.consent)}
        error={messageFor('consent')}
        name="consent"
        required
        checked={draft.consent}
        onChange={(event) => update('consent', event.target.checked)}
      />

      <div className="flex flex-col items-start">
        <Button
          type="submit"
          variant="ink"
          size="md"
          disabled={status === 'sending'}
          aria-describedby={statusId}
          className="disabled:cursor-progress disabled:opacity-70"
        >
          {status === 'sending'
            ? t(form.sending)
            : t(isBusiness ? form.submitBusiness : form.submitCandidate)}
        </Button>
        {/* Always in the DOM so assistive tech announces the outcome when it appears. */}
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`mt-3 text-[13.5px] leading-[1.5] empty:mt-0 ${
            status === 'success' ? 'text-accent' : 'text-magenta'
          }`}
        >
          {statusMessage}
        </p>
      </div>

      <p className="text-[12.5px] leading-[1.5] text-ink/50">
        {t(form.privacy)}{' '}
        <a
          href="./privacy.html"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 transition-colors duration-200 hover:text-accent"
        >
          {t(form.privacyLink)}
        </a>
      </p>
    </form>
  )
}
