import { parseQueryParams } from '@/components/ui/Pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBoxes } from '../api/getBoxes'
import { paramsSchema } from '../BoxSolutions.types'

export const useBoxes = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, paramsSchema)

  const { data, isPending, isError, isLoading } = useQuery({
    queryKey: ['boxSolutions', params],
    queryFn: meta => getBoxes({ params }, meta),
    placeholderData: prev => prev
  })

  return {
    boxes: data?.items,
    pagination: data?.pagination,
    isPending,
    isLoading,
    isError,
    queryKey: ['boxSolutions']
  }
}
