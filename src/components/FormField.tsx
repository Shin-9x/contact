import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const labelClasses =
  'font-mono text-[10.5px] tracking-[.14em] text-ink/50 uppercase'

const inputClasses =
  'w-full min-w-0 border-0 border-b border-ink/22 bg-transparent py-[10px] text-[16.5px] outline-none transition-colors duration-200 focus:border-b-accent'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function TextField({ label, className = '', ...props }: TextFieldProps) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className={labelClasses}>{label}</span>
      <input className={`${inputClasses} ${className}`} {...props} />
    </label>
  )
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export function TextAreaField({ label, className = '', ...props }: TextAreaFieldProps) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className={labelClasses}>{label}</span>
      <textarea
        className={`w-full min-w-0 resize-y rounded-[4px] border border-ink/18 bg-transparent p-3 text-[16.5px] outline-none transition-colors duration-200 focus:border-accent ${className}`}
        {...props}
      />
    </label>
  )
}
