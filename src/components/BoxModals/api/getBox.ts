import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { IBox, TimeSlot } from '../ManageBoxModal/ManageBoxModal.type'
import type { IBoxDTO } from './type'

export const getBox = async (boxId: string | null): Promise<IBox | undefined> => {
  if (!boxId) return
  const response = await api.get<IBoxDTO>(API_ROUTES.boxes.byId(boxId))

  if (!response.data) throw new Error('Faild to get box')

  const {
    id,
    name,
    slug,
    description,
    rules,
    slots,
    location,
    price,
    image,
    status,
    organizer,
    created_at,
    updated_at
  } = response.data

  return {
    id,
    name,
    slug,
    description,
    rules,
    date: '',
    slots: (slots || []).map(slot => ({
      date: slot.date,
      timeFrom: slot.time_from,
      timeTo: slot.time_to
    })) as TimeSlot[],
    location,
    price,
    image: image || '',
    status,
    organizer,
    createdAt: created_at,
    updatedAt: updated_at
  } as IBox
}
