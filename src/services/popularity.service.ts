import { api } from '@/app/providers/axios'
import { MOCK_BOXES } from '@/mockData/mockBoxes'

interface IDateRangeParams {
  dateFrom: string
  dateTo: string
}

export const popularityApi = {
  getBoxes: async (params: IDateRangeParams) => {
    const queryParams = {
      date_from: params.dateFrom,
      date_to: params.dateTo,
      sort_by: 'popularity'
    }
    const response = await api
      .get('/analytics/boxes', {
        params: queryParams
      })
      .then(res => (res.data = MOCK_BOXES))

    return response
  },

  exportData: async (params: IDateRangeParams) => {
    const queryParams = {
      type: 'boxes',
      date_from: params.dateFrom,
      date_to: params.dateTo
    }

    const response = await api.get(`/analytics/export`, {
      params: queryParams,
      responseType: 'blob'
    })
    return response
  }
}
