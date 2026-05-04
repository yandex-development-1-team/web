import { z } from 'zod'

export const filterSchema = z.object({
  search: z.string().optional().catch(''),
  status: z.enum(['all', 'active', 'inactive']).optional().catch('all'),
  offset: z.string().optional().catch('0'),
  limit: z.string().optional().catch('10')
})

export type TFilters = z.infer<typeof filterSchema>

type TStatus = 'active' | 'inactive'

export type TPagination = {
  total?: number
  limit?: number
  offset?: number
}

export interface ISpecialProject {
  id?: number
  title?: string
  status?: TStatus
  description?: string
  image?: string | null
  created_at?: string
  updated_at?: string
}

export interface ISpecialProjectsResponse {
  items: ISpecialProject[]
  pagination: TPagination
}

export interface ICreateSpecialProjectDTO {
  title: string
  status: TStatus
  description: string
  image?: string | null
}

export interface IUpdateSpecialProjecDTO extends Partial<ICreateSpecialProjectDTO> {
  id: number
}

export interface IProjectQueryParams {
  limit?: number
  search?: string
  offset?: number
  status?: TStatus
}

type TLinks = { id?: string; title?: string; url?: string }

export interface TResources {
  slug?: string
  content?: string
  title?: string
  links?: TLinks[]
  updated_at?: string
}
