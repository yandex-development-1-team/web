import { parseQueryParams } from '@/components/ui/Pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBoxes } from '../api/box/getBoxes'
import { getApplications } from '../api/specialProject/getSpecialProjects'
import { applicationsParamsSchema, type AppType } from '../applications.types'

const boxesQueryKey = 'boxQueryKey' as const
const specialProjectsQueryKey = 'specialProjectQueryKey' as const

export const useApplications = (activeTab: AppType) => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, applicationsParamsSchema)

  const isBoxTab = activeTab === 'box'
  const isProjectsTab = activeTab === 'specialProject'

  const boxes = useQuery({
    queryKey: [boxesQueryKey, params],
    queryFn: meta => getBoxes({ params }, meta),
    enabled: isBoxTab,
    placeholderData: prev => prev
  })

  const projects = useQuery({
    queryKey: [specialProjectsQueryKey, params],
    queryFn: meta => getApplications({ params }, meta),
    enabled: isProjectsTab,
    placeholderData: prev => prev
  })

  const isError = boxes.isError || projects.isError

  return { boxes, projects, boxesQueryKey, specialProjectsQueryKey, isError }
}
