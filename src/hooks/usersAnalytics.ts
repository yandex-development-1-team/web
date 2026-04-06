import { useQuery } from '@tanstack/react-query'
import { usersStatsApi } from '@/services/usersStats.service'
import type { IDateRangeParams } from '@/types/users_stats'

export const useUsersData = (params: IDateRangeParams | null) => {
  return useQuery({
    queryKey: ['analytics', 'users', params?.dateFrom || '', params?.dateTo || ''],
    queryFn: () => usersStatsApi.getUsers(params!),
    enabled: !!params
  })
}

export const useExportUsers = (params: IDateRangeParams | null) => {
  return useQuery({
    queryKey: ['analytics', 'export-users', params?.dateFrom || '', params?.dateTo || ''],
    queryFn: () => usersStatsApi.exportUsers(params!),
    enabled: !!params
  })
}
