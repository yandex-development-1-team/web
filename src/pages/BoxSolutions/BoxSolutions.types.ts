import z from 'zod'

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
  status: boolean
  organizer: string
  createdAt: string
  updatedAt: string
  createdBy: number
}

type ModalType = 'create' | 'edit' | 'delete' | 'details'
export type ModalStateType = { type: Exclude<ModalType, 'create'>; id: string } | { type: 'create'; id: null } | null

const boxStatusField = ['active', 'inactive'] as const
const boxSortField = ['name', 'created_at', 'updated_at'] as const
const boxOrderField = ['asc', 'desc'] as const

export const boxSolutionsParamsSchema = z.object({
  limit: z.coerce.number().min(1).max(20).default(6),
  offset: z.coerce.number().min(0).default(0),
  status: z.enum(boxStatusField).optional(),
  location: z.string().optional(),
  organizer: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(boxSortField).optional(),
  order: z.enum(boxOrderField).optional()
})

export type BoxSolutionsSearchParamsType = z.infer<typeof boxSolutionsParamsSchema>
