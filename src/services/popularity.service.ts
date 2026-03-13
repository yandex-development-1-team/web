import { api } from '@/app/providers/axios'
import { MOCK_BOXES } from '@/mockData/mockBoxes'
import type { IDateRangeParams, IBox, ExportData } from '@/types/popularity.types'

export const popularityApi = {
  getBoxes: async (params: IDateRangeParams): Promise<IBox[]> => {
    const queryParams = {
      date_from: params.dateFrom,
      date_to: params.dateTo,
      sort_by: 'popularity'
    }
    try {
      const response = await api.get('/analytics/boxes', {
        params: queryParams
      })
      const data = (response.data = MOCK_BOXES)
      return data
    } catch {
      return MOCK_BOXES
    }
  },

  exportData: (params: IDateRangeParams): Promise<ExportData> => {
    const queryParams = {
      type: 'boxes',
      date_from: params.dateFrom,
      date_to: params.dateTo
    }

    return api
      .get(`/analytics/export`, {
        params: queryParams,
        responseType: 'blob'
      })
      .then(res => res.data)
  }
}
