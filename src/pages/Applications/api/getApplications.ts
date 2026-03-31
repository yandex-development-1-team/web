import { mockApplications, type ApplicationParamsType, type ApplicationsPesponseType } from '../applications.types'

export const getApplications = ({ params }: { params: ApplicationParamsType }) => {
  // const response = api.get<ApplicationsPesponseType>('', { params, signal })
  // if (!response) throw new Error('Faild to get box applications')

  console.log('getApplications params =>>>', { params }) //TODO: console

  //Имитация пагинации на беке
  const filteredApp = mockApplications.filter(x => {
    const matchType = !params.type || x.type === params.type
    const matchStatus = !params.status || params.status === 'all' || x.status === params.status
    const matchManager =
      !params.created_by || params.created_by === 'all' || x.created_by.toString() === params.created_by

    return matchType && matchStatus && matchManager
  })

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
