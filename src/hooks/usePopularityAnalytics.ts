import { popularityApi } from '@/services/popularity.service'
import type { IDateRangeParams } from '@/types/popularity.types'
import { useQuery } from '@tanstack/react-query'

export const useBoxesData = (params: IDateRangeParams | null) => {
  return useQuery({
    queryKey: ['analytics', 'boxes', params?.dateFrom || '', params?.dateTo || ''],
    queryFn: () => popularityApi.getBoxes(params!),
    enabled: !!params
  })
}

export const useExportData = (params: IDateRangeParams | null) => {
  return useQuery({
    queryKey: ['analytics', 'export', params?.dateFrom || '', params?.dateTo || ''],
    queryFn: () => popularityApi.exportData(params!),
    enabled: !!params
  })
}
