import z from 'zod'

export const boxStatusField = ['active', 'disable'] as const

export const boxSortField = ['name', 'created_at', 'updated_at'] as const

export const boxOrderField = ['asc', 'desc'] as const

export const paramsSchema = z.object({
  limit: z.coerce.number().min(1).max(20).default(6),
  offset: z.coerce.number().min(0).default(0),
  status: z.enum(boxStatusField).optional(),
  search: z.string().optional(),
  sort: z.enum(boxSortField).optional(),
  order: z.enum(boxOrderField).optional()
})

export type IParams = z.infer<typeof paramsSchema>

export interface IPagination {
  limit: number
  offset: number
  total: number
}
