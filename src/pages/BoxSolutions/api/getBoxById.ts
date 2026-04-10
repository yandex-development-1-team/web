import { api } from '@/app/providers/axios'

import { API_ROUTES } from '@/services/api/routes'
import type { IBox, TimeSlot } from '../BoxSolutions.types'

interface IBoxDTO {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  slots: {
    slot_date: string
    start_time: string
    end_time: string
  }[]
  location: string
  price: number
  image: null
  status: 'active' | 'inactive'
  organizer: string
  created_at: string
  updated_at: string
}

export const getBoxById = async (id: string | null): Promise<IBox | undefined> => {
  if (!id) return
  const response = await api.get<IBoxDTO>(API_ROUTES.boxes.byId(id))

  if (!response.data) throw new Error('Faild to get box')

  const box = response.data

  return {
    id: box.id,
    name: box.name,
    slug: box.slug,
    description: box.description,
    rules: box.rules,
    date: '',
    slots: (box.slots || []).map(slot => ({
      date: slot.slot_date,
      timeFrom: slot.start_time,
      timeTo: slot.end_time
    })) as TimeSlot[],
    location: box.location,
    price: box.price,
    image: box.image || '',
    status: box.status === 'active',
    organizer: box.organizer,
    createdAt: box.created_at,
    updatedAt: box.updated_at,
    createdBy: 777
  } as IBox
}

//Response
// {
//     "id": 1,
//     "name": "Новогодний квест",
//     "slug": "",
//     "description": "Новогоднее приключение",
//     "rules": "Правила новогоднего квеста",
//     "slots": [
//         {
//             "slot_date": "2024-06-01",
//             "start_time": "10:00",
//             "end_time": "12:00"
//         },
//         {
//             "slot_date": "2024-06-01",
//             "start_time": "14:00",
//             "end_time": "16:00"
//         },
//         {
//             "slot_date": "2024-06-02",
//             "start_time": "11:00",
//             "end_time": "13:00"
//         }
//     ],
//     "location": "Москва",
//     "price": 1000,
//     "image": null,
//     "status": "active",
//     "organizer": "Организатор 1",
//     "created_at": "2026-04-08T13:50:35.887773Z",
//     "updated_at": "2026-04-08T13:50:35.887773Z"
// }

// BoxSolutionModalData = Omit<BoxData, 'slug' | 'date' | 'created_at' | 'updated_at' | 'created_by'>
