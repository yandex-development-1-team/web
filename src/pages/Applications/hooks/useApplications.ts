import { parseQueryParams } from '@/components/ui/Pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBoxes } from '../api/box/getBoxes'
import { getApplications } from '../api/specialProject/getSpecialProjects'
import { applicationsParamsSchema } from '../applications.types'

const boxesQueryKey = 'boxQueryKey' as const
const specialProjectsQueryKey = 'specialProjectQueryKey' as const

export const useApplications = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, applicationsParamsSchema)

  const boxes = useQuery({
    queryKey: [boxesQueryKey, params],
    queryFn: meta => getBoxes({ params }, meta),
    placeholderData: prev => prev
  })

  const specialProjects = useQuery({
    queryKey: [specialProjectsQueryKey, params],
    queryFn: meta => getApplications({ params }, meta),
    placeholderData: prev => prev
  })

  const isError = boxes.isError || specialProjects.isError

  return { boxes, isError, specialProjects, boxesQueryKey, specialProjectsQueryKey }
}
