import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { TApplicationStatus } from '@/types/applications'

export const changeBookingStatus = async (id: string, { status }: { status: TApplicationStatus }) => {
  const response = await api.put(API_ROUTES.bookings.changeStatus(id), { status })

  if (!response) throw new Error('Faild to update status')
}
