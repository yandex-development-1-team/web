import { useQuery } from '@tanstack/react-query'
import { getFormLink } from '../api/getFormLink'

export const useFormLink = () => {
  const { data } = useQuery({
    queryKey: ['req-spec-projects'],
    queryFn: getFormLink
  })

  return {
    data,
    links: data?.links,
    item: data?.links?.find(item => item?.title?.toLowerCase() === 'яндекс форма'.toLowerCase()) || null
  }
}
