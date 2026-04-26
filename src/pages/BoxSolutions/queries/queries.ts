import { parseQueryParams } from '@/components/ui/Pagination'
import { BOX_SOLUTIONS_KEYS } from '@/services/api/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBoxes } from '../api/api'
import { boxSolutionsParamsSchema } from '../types'

export const useFetchBoxes = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, boxSolutionsParamsSchema)

  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: [...BOX_SOLUTIONS_KEYS.all, params],
    queryFn: meta => getBoxes({ params }, meta),
    placeholderData: prev => prev
  })

  return {
    boxes: data?.items,
    pagination: data?.pagination,
    isPending,
    isLoading,
    isError
  }
}
