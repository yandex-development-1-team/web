import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const deleteBoxById = async (id: string) => {
  const response = await api.delete(API_ROUTES.bookings.byId(id))

  if (!response) throw new Error('Faild to delete booking')
}
