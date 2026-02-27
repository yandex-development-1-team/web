import { api } from '@/app/providers/axios'

import { MOCK_FILES } from '@/mockData/mockFileUploaderList'
import type { TFile } from '../DataExport.types'

export const getFiles = async (tabTitle: string) => {
  const response = await api.get<TFile[]>(`/api/v1/export/${tabTitle}`)

  if (!Array.isArray(response.data))
    return new Promise<TFile[]>(resolve => {
      setTimeout(() => {
        resolve(MOCK_FILES)
      }, 500)
    })

  return response.data
}
