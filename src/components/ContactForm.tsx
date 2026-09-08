import { useId, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { TextAreaField, TextField } from './FormField'
import { form } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import {
  isContactEndpointConfigured,
  sendEnquiry,
  type EnquiryType,
} from '../services/contactService'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

const emptyFields = { name: '', email: '', phone: '', message: '' }

function tabClasses(isActive: boolean) {
  return `min-w-0 flex-[1_1_0] cursor-pointer rounded-full border px-[14px] py-[10px] text-[13.5px] transition-colors duration-200 ${
    isActive ? 'border-transparent bg-ink text-paper' : 'border-ink/18 text-ink/70 hover:border-ink/40'
  }`
}

export function ContactForm() {
  const { language, t } = useLanguage()
  const [type, setType] = useState<EnquiryType>('business')
  const [fields, setFields] = useState(emptyFields)
  const [status, setStatus] = useState<Status>('idle')
  const statusId = useId()

  const isBusiness = type === 'business'

  const update = (key: keyof typeof emptyFields) => (event: { target: { value: string } }) => {
    setFields((current) => ({ ...current, [key]: event.target.value }))
    if (status !== 'sending') setStatus('idle')
  }

  const selectType = (next: EnquiryType) => {
    setType(next)
    setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isContactEndpointConfigured) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      await sendEnquiry({ type, ...fields, language })
      setFields(emptyFields)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const statusMessage =
    status === 'success'
      ? t(form.success)
      : status === 'error'
        ? t(form.error)
        : status === 'unconfigured'
          ? t(form.unconfigured)
          : ''

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-card border border-ink/12 bg-white p-[clamp(24px,3vw,40px)]"
    >
      <div role="group" aria-label={t(form.typeLegend)} className="flex gap-2">
        <button
          type="button"
          aria-pressed={isBusiness}
          onClick={() => selectType('business')}
          className={tabClasses(isBusiness)}
        >
          {t(form.tabs.business)}
        </button>
        <button
          type="button"
          aria-pressed={!isBusiness}
          onClick={() => selectType('candidate')}
          className={tabClasses(!isBusiness)}
        >
          {t(form.tabs.candidate)}
        </button>
      </div>

      <TextField
        label={t(form.fields.name)}
        type="text"
        name="name"
        autoComplete="name"
        required
        value={fields.name}
        onChange={update('name')}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-5">
        <TextField
          label={t(form.fields.email)}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={fields.email}
          onChange={update('email')}
        />
        <TextField
          label={t(form.fields.phone)}
          type="tel"
          name="phone"
          autoComplete="tel"
          value={fields.phone}
          onChange={update('phone')}
        />
      </div>

      <TextAreaField
        label={t(isBusiness ? form.fields.messageBusiness : form.fields.messageCandidate)}
        name="message"
        rows={4}
        value={fields.message}
        onChange={update('message')}
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

      <p className="text-[12.5px] leading-[1.5] text-ink/50">{t(form.privacy)}</p>
    </form>
  )
}
