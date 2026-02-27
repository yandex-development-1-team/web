import { api } from '@/app/providers/axios'
import type { TFile } from '../FileItem'
import { MOCK_FILES } from '@/mockData/mockFileUploaderList'

export const getFiles = async () => {
  const response = await api.get<TFile[]>('/api/v1/export/')

  if (!Array.isArray(response.data))
    return new Promise<TFile[]>(resolve => {
      setTimeout(() => {
        resolve(MOCK_FILES)
      }, 1000)
    })

  return response.data
}
