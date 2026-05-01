import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getSpecialProjects } from '../api/getSpecialProjects'

export const useSpecialProjects = () => {
  const [queryParams] = useSearchParams()
  const params = Object.fromEntries(queryParams.entries())

  return useQuery({
    queryKey: ['specialProjects', params],
    queryFn: () => getSpecialProjects({ params }),
    // placeholderData: prev => prev
    placeholderData: keepPreviousData
  })
}
