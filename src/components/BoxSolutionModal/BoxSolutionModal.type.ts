import type { TimeRange } from '@/lib/utils.time'
import type { BoxData } from '@/types/solutions'

export type ModalAction = 'create' | 'edit'

export type BoxSolutionModalType = {
  isOpen: boolean
  onClose: () => void
  action: ModalAction
  boxData?: BoxData
  onSave: (data: Omit<BoxData, 'id'>) => void
}

export type BoxSolutionFormData = {
  name: string
  isActive: boolean
  date?: Date
  timeRange?: TimeRange
  location: string
  description: string
  rules: string
  cost: string
  organizer: string
  image?: File
}
