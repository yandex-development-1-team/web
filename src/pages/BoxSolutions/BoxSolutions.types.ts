import z from 'zod'

export interface TimeSlot {
  date: string // ISO формат "2024-03-10"
  time_from: string // "00:00"
  time_to: string // "00:00"
}

export interface IBox {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string
  time_slots: TimeSlot[]
  location: string
  price: number
  image: string
  is_active_in_bot: boolean
  organizer: string
  created_at: string
  updated_at: string
  created_by: number
}

export interface IPagination {
  limit: number
  offset: number
  total: number
}
type ModalType = 'create' | 'edit' | 'delete' | 'details'
export type ModalState = { type: Exclude<ModalType, 'create'>; id: number } | { type: 'create'; id: null } | null

const boxStatusField = ['active', 'disable'] as const
const boxSortField = ['name', 'created_at', 'updated_at'] as const
const boxOrderField = ['asc', 'desc'] as const

export const paramsSchema = z.object({
  limit: z.coerce.number().min(1).max(20).default(6),
  offset: z.coerce.number().min(0).default(0),
  status: z.enum(boxStatusField).optional(),
  search: z.string().optional(),
  sort: z.enum(boxSortField).optional(),
  order: z.enum(boxOrderField).optional()
})

export type BoxSolutionsSearchParamsType = z.infer<typeof paramsSchema>
