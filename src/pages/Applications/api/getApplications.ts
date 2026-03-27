import type { IPagination, IParams } from '@/components/ui/Pagination/Pagination.types'
import { mockApplications, type ApplicationListItem } from '../Applications.types'

type ApplicationsPesponseType = {
  items: ApplicationListItem[]
  pagination: IPagination
}

export const getApplications = ({ params }: { params: IParams }) => {
  // const response = api.get<ApplicationsPesponseType>('', { params, signal })
  // if (!response) throw new Error('Faild to get box applications')

  //Имитация пагинации на беке

  const limit = Number(params.limit)
  const offset = Number(params.offset)
  const total = mockApplications.length

  const applications = mockApplications.slice(offset, offset + limit)

  return {
    items: applications,
    pagination: {
      limit,
      offset,
      total
    }
  } as ApplicationsPesponseType
}
