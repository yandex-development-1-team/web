import { useQuery } from '@tanstack/react-query'
import { getBoxSolutions } from '../api/getBoxSolutions'

export const useBoxSolutions = (page: number) => {
  const {
    data: boxes,
    isPending,
    isError
  } = useQuery({
    queryKey: ['boxSolutions', page],
    queryFn: () => getBoxSolutions(page),
    placeholderData: prev => prev
  })

  return {
    boxes,
    isPending,
    isError,
    queryKey: ['boxSolutions']
  }
}
