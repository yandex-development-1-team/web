import z from 'zod'

// export type ApplicationStatus = 'queue' | 'in_progress' | 'done'
export type StatusType = 'pending' | 'confirmed' | 'cancelled'
export type AppType = 'bookings' | 'applications'
export type SourceType = 'telegram_bot' | 'manual'

export type ApplicationListItemType = {
  id: number
  status: StatusType
  managerId: number
  managerName: string
  customerName: string
  contactInfo: string
  createdAt: string
}

export type ApplicationType = {
  formAnswerId: string
  description?: string
  updatedAt: string
} & ApplicationListItemType

// export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export type BookingListItemType = {
  id: number
  status: StatusType
  guestName: string
  guestContact: string
  serviceName: string
  managerId: number
  managerName: string
  createdAt: string
}

export type BookingType = {
  userId: number
  serviceId: number
  bookingDate: string
  bookingTime: string
  guestOrganization: string
  guestPosition: string
  updatedAt: string
} & BookingListItemType

// const applicationStatus = ['queue', 'in_progress', 'done'] as const
const applicationStatus = ['pending', 'confirmed', 'cancelled'] as const
// const applicationType = ['box', 'special_project'] as const

export const applicationsParamsSchema = z.object({
  status: z.enum(applicationStatus).optional(), //default('all'),
  // type: z.enum(applicationType).default('box'),
  search: z.string().optional(),
  manager_id: z.string().optional(), //default('all'),
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
// export const mockApplications = mock as ApplicationListItem[]

// const boxStatusField = ['active', 'disable'] as const
// const boxSortField = ['name', 'created_at', 'updated_at'] as const
// const boxOrderField = ['asc', 'desc'] as const

// export const paramsSchema = z.object({
//   limit: z.coerce.number().min(1).max(20).default(6),
//   offset: z.coerce.number().min(0).default(0),
//   status: z.enum(boxStatusField).optional(),
//   manager_id: z.string().default('all'),
//   location: z.string().optional(),
//   organizer: z.string().optional(),
//   search: z.string().optional(),
//   sort: z.enum(boxSortField).optional(),
//   order: z.enum(boxOrderField).optional()
// })
// export type BoxSolutionsSearchParamsType = z.infer<typeof paramsSchema>

// export interface QueryState<T> {
//   data: {
//     items: T[]
//     pagination: IPagination | undefined
//   }
//   isPending: boolean | undefined
//   isLoading: boolean | undefined
//   isError: boolean | undefined
//   queryKey: readonly string[]

//   // data: T[]
//   // pagination: IPagination | undefined
//   // isPending: boolean | undefined
//   // isLoading: boolean | undefined
//   // isError: boolean | undefined
//   // queryKey: readonly string[]
// }

export type ModalStateType = { type: AppType; id: string }
