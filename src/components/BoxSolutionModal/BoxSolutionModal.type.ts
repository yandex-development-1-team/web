import type { BoxData } from '@/types/solutions'
import type z from 'zod'
import type { boxSolutionSchema } from './schema'

export type ModalAction = 'create' | 'edit'

export type BoxSolutionModalData = Omit<BoxData, 'slug' | 'date' | 'created_at' | 'updated_at' | 'created_by'>

export type BoxSolutionModalType = {
  isOpen: boolean
  onClose: () => void
  boxData?: BoxSolutionModalData
  boxId: string | null
  onSave: (data: Partial<Omit<BoxData, 'id'>>) => void
}

export type BoxSolutionFormData = z.infer<typeof boxSolutionSchema>
