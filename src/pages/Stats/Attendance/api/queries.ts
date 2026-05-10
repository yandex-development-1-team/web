import { useQuery } from '@tanstack/react-query'
import { getAttendance } from './api'

export const useFetchAttendance = () => {
  const { data, isPending, isLoading } = useQuery({
    queryFn: getAttendance,
    queryKey: ['attendance']
  })

  return {
    attendance: data,
    isPending,
    isLoading
  }
}
