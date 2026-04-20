import { parseQueryParams } from '@/components/ui/Pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getApplications } from '../api/applications/getApplications'
import { getBookings } from '../api/bookings/getBookings'
import { applicationsParamsSchema } from '../applications.types'

const bookingsQueryKey = 'bookingsQueryKey' as const
const applicationsQueryKey = 'applicationsQueryKey' as const

export const useApplications = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, applicationsParamsSchema)

  console.log('useApplication=>>>', { params }) //TODO: console

  const bookings = useQuery({
    queryKey: [bookingsQueryKey, params],
    queryFn: meta => {
      console.log('Инвалидируем bookingsQueryKey')
      return getBookings({ params }, meta)
    }
    // placeholderData: prev => prev
  })

  const applications = useQuery({
    queryKey: [applicationsQueryKey, params],
    queryFn: meta => getApplications({ params }, meta),
    placeholderData: prev => prev
  })

  return { bookings, applications, bookingsQueryKey, applicationsQueryKey }
}
