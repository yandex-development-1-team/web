import { MOCK_FILES } from '@/mockData/mockFileUploaderList'
import type { TFile } from '../DataExport.types'

export const getFiles = async (path: string) => {
  void path
  // const response = await api.get<TFile[]>(API_ROUTES.export.byPath(path))

  // if (!response.data) throw new Error(`Server Error: Failed to get files`)

  // return response.data
  return new Promise<TFile[]>(resolve => {
    setTimeout(() => {
      resolve(MOCK_FILES)
    }, 300)
  })
}
