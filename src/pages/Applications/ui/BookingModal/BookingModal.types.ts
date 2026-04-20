import type { IBoxApplication, TApplicationStatus } from '@/types/applications'

export type BoxApplicationModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string | number) => Promise<void>
  onModify: (id: string | number, newStatus: TApplicationStatus) => Promise<void>
  data?: IBoxApplication
  id: string
  queryKey?: string[] | undefined
}
