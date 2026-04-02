import z from 'zod'

export type BoxStatus = 'active' | 'disable'

export interface IBox {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string
  time: string
  location: string
  price: number
  image: string
  status: BoxStatus
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

export type ModalState = { type: 'delete' | 'edit'; id: number } | { type: 'create'; id: null } | null

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
