import type { ISpecialProjectApplication, TApplicationStatus } from '@/types/applications'

export type SpecialProjectApplicationModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string | number) => Promise<void>
  onModify: (id: string | number, newStatus: TApplicationStatus) => Promise<void>
  data: ISpecialProjectApplication
}
