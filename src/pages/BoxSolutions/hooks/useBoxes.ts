import { getParams } from '@/components/Pagination/helpers/getParams'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBoxes } from '../api/getBoxes'

export const useBoxes = () => {
  const [searchParams] = useSearchParams()
  const params = getParams(searchParams)

  const { data, isPending, isError } = useQuery({
    queryKey: ['boxSolutions', params],
    queryFn: () => getBoxes(params),
    placeholderData: prev => prev
  })

  return {
    boxes: data?.items,
    pagination: data?.pagination,
    isPending,
    isError,
    queryKey: ['boxSolutions']
  }
}
