import { generateDatesBetween, generateMockBoxData, randomInt } from '@/mockData/mockApplicationStats'
import type {
  BoxStatsApiResponse,
  BoxStatsSearchParams,
  BoxStatsSeries
} from '@/pages/Stats/ApplicationsStats/ApplicationStats.types'

export const getBoxStats = async (params: BoxStatsSearchParams) => {
  const dates = generateDatesBetween(params.dateFrom, params.dateTo)

  const mockBoxes: BoxStatsSeries[] = [generateMockBoxData(randomInt(1, 10000), params.search || 'Box A', dates)]

  return {
    periods: mockBoxes
  } as BoxStatsApiResponse

  // const response = await api.get<BoxStatsApiResponse>(API_ROUTES.boxes.get, { params })
  // if (!response.data) throw new Error('Failed to get box stats')
  // return response.data
}
