import { parseQueryParams } from '@/components/ui/Pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getApplications } from '../api/getApplications'

export const useApplications = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams)

  const { data, isPending, isError, isLoading } = useQuery({
    queryKey: ['applications', params],
    queryFn: meta => getApplications({ params }, meta),
    placeholderData: prev => prev
  })

  return {
    applications: data?.items ?? [],
    pagination: data?.pagination,
    isPending,
    isLoading,
    isError,
    queryKey: ['applications']
  }
}
