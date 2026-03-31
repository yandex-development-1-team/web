import { parseQueryParams } from '@/components/ui/Pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getApplications } from '../api/getApplications'
import { applicationsParamsSchema } from '../applications.types'

export const useApplications = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, applicationsParamsSchema)

  console.log('useApplication=>>>', { params }) //TODO: console

  const { data, isPending, isError, isLoading } = useQuery({
    queryKey: ['applications', params],
    queryFn: () => getApplications({ params }),
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
