export interface FormFields {
  box_name: string
  date: string
  time: string
  total_slots: number
  location: string
}

export interface FormFieldConfig {
  name: keyof FormFields
  label: string
  type: string
}

export interface IEditEventModal {
  defaultValue: FormFields
  onSaveForm: (event: FormFields) => void
  isOpen: boolean
  onClose: () => void
}
