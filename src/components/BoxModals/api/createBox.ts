import { api } from '@/app/providers/axios'
import type { ICreateBoxRequest } from '../ManageBoxModal/ManageBoxModal.type'

export const createBox = async (payload: ICreateBoxRequest): Promise<{ message: string }> => {
  const response = await api.post<Promise<{ message: string }>>('/boxes/', payload)

  if (!response.data) throw new Error('Error on box create')

  return response.data
}
