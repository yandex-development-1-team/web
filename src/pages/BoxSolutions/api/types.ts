import type { IPagination } from '@/types/schedule.types'

export interface IBoxDTO {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  slots: {
    date: string
    time_from: string
    time_to: string
  }[]
  location: string
  price: number
  image: string
  status: 'active' | 'inactive'
  organizer: string
  created_at: string
  updated_at: string
}

export type BoxesSolutionsResponseType<T> = {
  items: T[]
  pagination: IPagination
}
