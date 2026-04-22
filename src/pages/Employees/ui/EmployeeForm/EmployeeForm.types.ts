import type { EmployeeFormData } from '../../schema'

export type EmployeeFormType = {
  initialData?: EmployeeFormData
  initialPreview?: string | null
  onSubmit: (data: EmployeeFormData, hasNewImage: boolean) => void | Promise<void>
  onCancel: () => void
  title: string
}
