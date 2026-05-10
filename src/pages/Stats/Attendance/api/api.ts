import { api } from '@/app/providers/axios'

export const getAttendance = async ({ params }: { params: URLSearchParams }) => {
  const { data } = await api.get('', { params })

  return data
}
