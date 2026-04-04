import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

import { MOCK_FILES } from '@/mockData/mockFileUploaderList'
import type { TFile, TPath } from '../DataExport.types'

export const getFiles = async (path: TPath) => {
  const response = await api.get<TFile[]>(API_ROUTES.export.byPath(path))

  if (!Array.isArray(response.data))
    return new Promise<TFile[]>(resolve => {
      setTimeout(() => {
        resolve(MOCK_FILES)
      }, 300)
    })

  if (!response.data) throw new Error(`Server Error: Failed to get files`)

  return response.data
}
