import { api } from '@/app/providers/axios'

export const getAttendance = async () => {
  const { data } = await api.get('')

  return data
}
