import { useContext } from 'react'
import { EnquiryTypeContext } from './context'

export function useEnquiryType() {
  const context = useContext(EnquiryTypeContext)
  if (!context) {
    throw new Error('useEnquiryType must be used inside an EnquiryTypeProvider')
  }
  return context
}
