import type { IPagination } from '@/types/schedule.types'

export interface PaginationDTO {
  total: number
  limit: number
  offset: number
}

export type StatusDTO = 'pending' | 'confirmed' | 'cancelled'

export type ApplicationsPesponseType<T> = {
  items: T[]
  pagination: IPagination
}
