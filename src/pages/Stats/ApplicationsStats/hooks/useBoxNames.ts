import { getBoxNames } from '@/pages/Stats/ApplicationsStats/api/getBoxNames'
import { useQuery } from '@tanstack/react-query'

export const useBoxNames = () => {
  const { data, isPending, isError, isLoading } = useQuery({
    queryKey: ['apl', 'boxNames'],
    queryFn: () => getBoxNames(),
    placeholderData: prev => prev
  })

  return {
    boxNames: data,
    isPending,
    isLoading,
    isError
  }
}
