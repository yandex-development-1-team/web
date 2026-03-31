import type { IPagination } from '@/components/ui/Pagination/Pagination.types'
import z from 'zod'
import mock from './mock.json'

export type ApplicationStatus = 'queue' | 'in_progress' | 'done'
export type ApplicationType = 'box' | 'special_project'
export type ApplicatonSource = 'telegram_bot' | 'manual'

export interface Application {
  id: number
  type: ApplicationType
  source: ApplicatonSource
  customer_name: string
  project_name: string
  contact_info: string
  status: ApplicationStatus
  box_id: number | null
  special_project_id: number | null
  created_at: string
  updated_at: string
  created_by: number | null
}

export type ApplicationListItem = {
  id: number
  type: ApplicationType
  source: ApplicatonSource
  customer_name: string
  project_name: string
  contact_info: string
  status: ApplicationStatus
  created_at: string
  created_by: number
}

export const applicationsParamsSchema = z.object({
  status: z.enum(['queue', 'in_progress', 'done', 'all']).default('all'),
  type: z.enum(['box', 'special_project']).default('box'),
  created_by: z.string().default('all'), //z.coerce.number().int().positive().optional(),
  date_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  date_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  limit: z.coerce.number().min(1).max(20).default(6),
  offset: z.coerce.number().min(0).default(0)
})

export type ApplicationParamsType = z.infer<typeof applicationsParamsSchema>
export type ApplicationsPesponseType = {
  items: ApplicationListItem[]
  pagination: IPagination
}

//TODO: моки
// const STATUSES: ApplicationStatus[] = ['queue', 'in_progress', 'done']
// const TYPES: ApplicationType[] = ['box', 'special_project']
// const SOURCES: ApplicatonSource[] = ['telegram_bot', 'manual']

// export const mockApplications: ApplicationListItem[] = Array.from({ length: 72 }, (_, index) => {
//   const id = index + 1

//   const date = new Date()
//   date.setDate(date.getDate() - Math.floor(Math.random() * 30))

//   return {
//     id,
//     type: TYPES[Math.floor(Math.random() * TYPES.length)],
//     source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
//     customer_name: `Клиент ${id}`,
//     project_name: `Третьяковка №${1000 + id}`,
//     contact_info: `+7 (900) ${String(id).padStart(3, '0')}-00-00`,
//     status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
//     created_at: date.toISOString(),
//     created_by: id % 3 === 0 ? 777 : 555
//   }
// })
export const mockApplications = mock as ApplicationListItem[]
