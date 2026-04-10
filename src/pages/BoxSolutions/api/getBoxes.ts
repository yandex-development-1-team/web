import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { BoxSolutionsSearchParamsType, IBox, IPagination, TimeSlot } from '../BoxSolutions.types'

export interface IBoxDTO {
  ID: number
  Name: string
  Slug: string
  Description: string
  Rules: string
  BoxAvailableSlots: {
    Date: string
    EndTime: string
    StartTime: string
  }[]
  Location: string
  Price: number
  Image: string
  Status: 'active' | 'inactive'
  Organizer: string
  CreatedAt: string
  UpdatedAt: string
  // date: string
  // time_slots: TimeSlot[]
  // created_by: number
}

type BoxesSolutionsResponseType = {
  items: IBoxDTO[]
  pagination: IPagination
}

export const getBoxes = async (
  { params }: { params: BoxSolutionsSearchParamsType },
  { signal }: { signal: AbortSignal }
) => {
  const response = await api.get<BoxesSolutionsResponseType>(API_ROUTES.boxes.get, { params, signal })
  if (!response.data) throw new Error('Faild to get box solutions')

  //Имитация пагинации на беке
  // void signal
  // const limit = Number(params.limit)
  // const offset = Number(params.offset)
  // const total = MOCK_BOXES.length

  // const boxes = MOCK_BOXES.slice(offset, offset + limit) as IBox[]

  // return {
  //   items: boxes,
  //   pagination: {
  //     limit,
  //     offset,
  //     total
  //   }
  // } as BoxesSolutionsResponseType

  console.log('getBoxes =>>>>', response.data)

  return {
    items: response.data.items.map(box => ({
      id: box.ID,
      name: box.Name,
      slug: box.Slug,
      description: box.Description,
      rules: box.Rules,
      date: '',
      slots: (box.BoxAvailableSlots || []).map(slot => ({
        date: slot.Date,
        timeFrom: slot.StartTime,
        timeTo: slot.EndTime
      })) as TimeSlot[],
      location: box.Location,
      price: box.Price,
      image: box.Image || '',
      status: box.Status === 'active',
      organizer: box.Organizer,
      createdAt: box.CreatedAt,
      updatedAt: box.UpdatedAt,
      createdBy: 777
    })) as IBox[],
    pagination: response.data.pagination
  }

  // return {
  //   items: data,
  //   pagination: response.data.pagination
  // }
}
