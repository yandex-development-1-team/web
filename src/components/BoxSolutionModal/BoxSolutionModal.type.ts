import type z from 'zod'
import type { BoxData } from '@/types/solutions'
import type { boxSolutionSchema } from './schema'

export type ModalAction = 'create' | 'edit'

export type BoxSolutionModalType = {
  isOpen: boolean
  onClose: () => void
  action: ModalAction
  boxData?: BoxData
  onSave: (data: Omit<BoxData, 'id'>) => void
}

export type BoxSolutionFormData = z.infer<typeof boxSolutionSchema>
