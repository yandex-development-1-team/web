import { MOCK_BOXS_NAME } from '@/mockData/mockApplicationStats'

export const getBoxNames = async () => {
  // const response = await api.get<BoxNameList>(API_ROUTES.analytics.boxes)
  // if (!response.data) throw new Error('Failed to get box names')
  // return response.data

  return MOCK_BOXS_NAME
}
