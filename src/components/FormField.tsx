import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

/* The label follows the field: it turns accent while the control has focus. */
const labelClasses =
  'font-mono text-[10.5px] tracking-[.14em] text-ink/50 uppercase transition-colors duration-200 group-focus-within:text-accent'

const errorClasses = 'text-[12.5px] leading-[1.4] text-magenta'

const controlClasses =
  'w-full min-w-0 bg-transparent text-[16.5px] outline-none transition-[border-color,box-shadow] duration-200'

interface FieldProps {
  id: string
  label: string
  /** Shown next to the label, e.g. "optional". */
  hint?: string
  /** Localized message; its presence also marks the control as invalid. */
  error?: string
  /**
   * Keeps label, control and message aligned with the sibling field when two fields
   * share a row and one of them wraps onto a second line.
   */
  subgrid?: boolean
}

function shellClasses(subgrid?: boolean) {
  return subgrid
    ? 'group row-span-3 grid min-w-0 grid-rows-subgrid gap-2'
    : 'group grid min-w-0 gap-2'
}

function describedBy(id: string, error?: string) {
  return error ? `${id}-error` : undefined
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={`${id}-error`} className={errorClasses}>
      {error}
    </p>
  )
}

type TextFieldProps = FieldProps & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  id,
  label,
  hint,
  error,
  subgrid,
  className = '',
  ...props
}: TextFieldProps) {
  return (
    <div className={shellClasses(subgrid)}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {hint ? <span className="text-ink/35"> ({hint})</span> : null}
      </label>
      {/* The accent rule is drawn over the resting hairline on focus, left to right. */}
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error)}
          className={`peer ${controlClasses} border-0 border-b py-[10px] ${
            error ? 'border-b-magenta' : 'border-b-ink/22 focus:border-b-accent'
          } ${className}`}
          {...props}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 transition-transform duration-300 ease-soft peer-focus:scale-x-100 ${
            error ? 'bg-magenta' : 'bg-accent'
          }`}
        />
      </div>
      <FieldError id={id} error={error} />
    </div>
  )
}

type TextAreaFieldProps = FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextAreaField({
  id,
  label,
  hint,
  error,
  subgrid,
  className = '',
  ...props
}: TextAreaFieldProps) {
  return (
    <div className={shellClasses(subgrid)}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {hint ? <span className="text-ink/35"> ({hint})</span> : null}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={`${controlClasses} resize-y rounded-[4px] border p-3 ${
          error
            ? 'border-magenta'
            : 'border-ink/18 focus:border-accent focus:shadow-[0_0_0_3px_rgb(11_142_207/0.12)]'
        } ${className}`}
        {...props}
      />
      <FieldError id={id} error={error} />
    </div>
  )
}

type CheckboxFieldProps = FieldProps & InputHTMLAttributes<HTMLInputElement>

export function CheckboxField({
  id,
  label,
  error,
  subgrid: _subgrid,
  className = '',
  ...props
}: CheckboxFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="group/consent flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error)}
          className={`mt-[2px] h-[16px] w-[16px] shrink-0 cursor-pointer accent-accent transition-transform duration-200 ease-soft active:scale-90 ${className}`}
          {...props}
        />
        <span className="text-[13px] leading-[1.5] text-ink/65 transition-colors duration-200 group-hover/consent:text-ink/85">
          {label}
        </span>
      </label>
      <FieldError id={id} error={error} />
    </div>
  )
}
