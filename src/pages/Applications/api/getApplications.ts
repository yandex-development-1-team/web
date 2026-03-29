import type { IPagination } from '@/components/ui/Pagination/Pagination.types'
import z from 'zod'
import { mockApplications, type ApplicationListItem } from '../applications.types'

export const applicationsParamsSchema = z.object({
  status: z.enum(['queue', 'in_progress', 'done']).optional(),
  type: z.enum(['box', 'special_project']).optional().default('box'),
  manager_id: z.coerce.number().int().positive().optional(),
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

type ApplicationParamsType = z.infer<typeof applicationsParamsSchema>

type ApplicationsPesponseType = {
  items: ApplicationListItem[]
  pagination: IPagination
}

export const getApplications = ({ params }: { params: ApplicationParamsType }) => {
  // const response = api.get<ApplicationsPesponseType>('', { params, signal })
  // if (!response) throw new Error('Faild to get box applications')

  //Имитация пагинации на беке
  const filteredApp = mockApplications.filter(x => x.type === params.type)
  const limit = Number(params.limit)
  const offset = Number(params.offset)
  const total = filteredApp.length
  const applications = filteredApp.slice(offset, offset + limit)

  return {
    items: applications,
    pagination: {
      limit,
      offset,
      total
    }
  } as ApplicationsPesponseType
}
