import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { ApplicationParamsType, BoxListItemType } from '../../applications.types'
import type { ApplicationsPesponseType } from '../types'
import { mapBoxListItem } from './box.mapper'
import type { BookingListResponseDTO } from './types'

export const getBoxes = async (
  { params }: { params: ApplicationParamsType },
  { signal }: { signal: AbortSignal }
): Promise<ApplicationsPesponseType<BoxListItemType>> => {
  const response = await api.get<BookingListResponseDTO>(API_ROUTES.bookings.get, {
    params,
    signal
  })

  if (!response.data) throw new Error('Failed to get box applications')

  const boxes = response.data.items.map(app => mapBoxListItem(app))

  return {
    items: boxes,
    pagination: response.data.pagination
  }
}
