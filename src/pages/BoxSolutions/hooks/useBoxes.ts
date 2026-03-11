import { useQuery } from '@tanstack/react-query'
import { getBoxes } from '../api/getBoxes'

export const useBoxes = (page: number) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['boxSolutions', page],
    queryFn: () => getBoxes(page),
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
