import type { BoxData } from '@/types/solutions'
import type z from 'zod'
import type { boxSolutionSchema } from './schema'

export type ModalAction = 'create' | 'edit'

export type BoxSolutionModalData = Omit<BoxData, 'slug' | 'date' | 'created_at' | 'updated_at' | 'created_by'>

export type BoxSolutionModalType = {
  isOpen: boolean
  onClose: () => void
  queryKey: readonly string[] | undefined
  boxId: string | null
  boxData?: BoxSolutionModalData
  onSave?: (data: Partial<Omit<BoxData, 'id'>>) => Promise<void>
}

export type BoxSolutionFormData = z.infer<typeof boxSolutionSchema>

export type StatusType = 'active' | 'inactive'

export interface ICreateBoxRequest {
  name: string
  description?: string
  rules?: string
  location?: string
  price: number
  image?: string
  status: StatusType
  organizer?: string
  slots: {
    date: string
    time_from: string
    time_to: string
  }[]
}

export interface IUpdateBoxRequest extends ICreateBoxRequest {
  id: string
}

export interface TimeSlot {
  date: string
  timeFrom: string
  timeTo: string
}

export interface IBox {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string
  slots: TimeSlot[]
  location: string
  price: number
  image: string
  status: StatusType
  organizer: string
  createdAt: string
  updatedAt: string
}
