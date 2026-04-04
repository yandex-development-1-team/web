import { api } from '@/app/providers/axios'
import { mockUsersStats } from '@/mockData/mockUsersStatsPageData'
import type { ExportData, IDateRangeParams, IUsersStats } from '@/types/users_stats'

export const usersStatsApi = {
  getUsers: async (params: IDateRangeParams): Promise<IUsersStats[]> => {
    const queryParams = {
      date_from: params.dateFrom,
      date_to: params.dateTo
    }
    try {
      const response = await api.get('/analytics/users', {
        params: queryParams
      })
      const data = response.data.users ?? response.data
      return data
    } catch {
      return mockUsersStats
    }
  },

  exportUsers: async (params: IDateRangeParams): Promise<ExportData> => {
    const queryParams = {
      type: 'users',
      date_from: params.dateFrom,
      date_to: params.dateTo,
      format: 'xlsx'
    }
    return api
      .get('/analytics/export', {
        params: queryParams,
        responseType: 'blob'
      })
      .then(res => res.data)
  }
}
