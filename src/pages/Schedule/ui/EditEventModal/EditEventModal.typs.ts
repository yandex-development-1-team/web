import type { TimeRange } from '@/lib/utils.time'

export interface FormFields {
  box_name: string
  date: string
  time: TimeRange
  total_slots: number
  location: string
}

export interface FormFieldConfig {
  name: keyof FormFields
  label: string
  type: string
}

export interface defaultValueFild {
  box_name: string
  date: string
  time: TimeRange
  total_slots: number
  location: string
}

export interface IEditEventModal {
  defaultValue: defaultValueFild
  onSaveForm: (event: defaultValueFild) => void
  isOpen: boolean
  onClose: () => void
}
