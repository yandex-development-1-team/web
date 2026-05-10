import { useQuery } from '@tanstack/react-query'
import { getAttendance } from './api'
import { useSearchParams } from 'react-router-dom'

export const useFetchAttendance = () => {
  const [searchParams] = useSearchParams()

  const { data, isPending, isLoading } = useQuery({
    queryFn: () => getAttendance({ params: searchParams }),
    queryKey: ['attendance']
  })

  return {
    attendance: data,
    isPending,
    isLoading
  }
}
