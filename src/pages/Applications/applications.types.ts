import type { TApplicationStatus } from '@/types/applications'
import z from 'zod'

const appStatus = ['pending', 'confirmed', 'cancelled'] as const
const appType = ['box', 'specialProject'] as const

export type StatusType = (typeof appStatus)[number]
export type AppType = (typeof appType)[number]
export type SourceType = 'telegram_bot' | 'manual'

export type SpecialProjectListItemType = {
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
} & SpecialProjectListItemType

export type BoxListItemType = {
  id: number
  status: StatusType
  guestName: string
  guestContact: string
  serviceName: string
  managerId: number
  managerName: string
  createdAt: string
}

export type BoxType = {
  userId: number
  serviceId: number
  bookingDate: string
  bookingTime: string
  guestOrganization: string
  guestPosition: string
  updatedAt: string
} & BoxListItemType

export const applicationsParamsSchema = z.object({
  status: z.enum(appStatus).optional(),
  customer_name: z.string().optional(),
  manager_id: z.string().optional(),
  type: z.enum(appType).default('box'),
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

export type ModalStateType = { type: AppType; id: string }

export type ModalPropsType = {
  id: string
  isOpen: boolean
  activeTab: AppType
  queryKey?: string[] | undefined
  onClose: () => void
  onDelete: (id: string | number) => Promise<void>
  onModify: (id: string, newStatus: TApplicationStatus) => Promise<void>
}
