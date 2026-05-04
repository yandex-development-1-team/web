import { useQuery } from '@tanstack/react-query'
import { getFormLink } from '../api/getFormLink'

export const useFormLink = () => {
  const query = useQuery({
    queryKey: ['req-spec-projects'],
    queryFn: getFormLink
  })

  const data = query.data

  return {
    data,
    links: data?.links,
    item: data?.links?.find(item => item?.title?.toLowerCase() === 'яндекс форма'.toLowerCase()) || null,
    isLoading: query.isPending
  }
}
