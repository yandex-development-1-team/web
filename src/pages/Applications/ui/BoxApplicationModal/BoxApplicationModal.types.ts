import type { IBoxApplication, TApplicationStatus } from "@/types/applications"

export type BoxApplicationModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string | number) => void
  onEdit: (id: string | number, newStatus: TApplicationStatus) => void
  data: IBoxApplication
}
