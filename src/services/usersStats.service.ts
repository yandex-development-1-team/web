import { api } from '@/app/providers/axios'
import { mockUsersStats } from '@/mockData/mockUsersStatsPageData'
import type { IUsersStats, IDateRangeParams, ExportData } from '@/types/users_stats'
import { API_ROUTES } from './api/routes'

export const usersStatsApi = {
  getUsers: async (params: IDateRangeParams): Promise<IUsersStats[]> => {
    const queryParams = {
      date_from: params.dateFrom,
      date_to: params.dateTo
    }
    try {
      const response = await api.get(API_ROUTES.analytics.users, {
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
      .get(API_ROUTES.analytics.export, {
        params: queryParams,
        responseType: 'blob'
      })
      .then(res => res.data)
  }
}
