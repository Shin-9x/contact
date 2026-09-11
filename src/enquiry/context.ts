import { createContext } from 'react'
import type { EnquiryType } from '../services/enquiryValidation'

export interface EnquiryTypeContextValue {
  type: EnquiryType
  /** Preselects a tab of the contact form, from anywhere on the page. */
  selectType: (type: EnquiryType) => void
}

export const EnquiryTypeContext = createContext<EnquiryTypeContextValue | null>(null)
