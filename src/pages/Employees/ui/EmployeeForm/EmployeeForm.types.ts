import type { EmployeeFormData } from '../../schema'

export type EmployeeFormType = {
  title: string
  isSubmiting?: boolean
  initialData?: EmployeeFormData
  initialPreview?: string | null
  onSubmit: (data: EmployeeFormData) => void | Promise<void>
  onCancel: () => void
}
