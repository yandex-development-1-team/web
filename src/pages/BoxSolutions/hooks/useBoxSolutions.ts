import { useQuery } from '@tanstack/react-query'
import { getBoxSolutions } from '../api/getBoxSolutions'

export const useBoxSolutions = () => {
  const {
    data: boxes,
    isPending,
    isError
  } = useQuery({
    queryKey: ['boxSolutions'],
    queryFn: () => getBoxSolutions()
  })

  return {
    boxes,
    isPending,
    isError
  }
}
