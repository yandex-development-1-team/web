import type { FormFields } from '@/pages/Schedule/ui/EditEventModal/schemas/EditEventModal.schema'

export interface FormFieldConfig {
  name: keyof FormFields
  placeholder: string
  label: string
  type: string
}

export interface IEditEventModal {
  defaultValue: FormFields
  onSaveForm: (event: FormFields) => void
  isOpen: boolean
  onClose: () => void
}
