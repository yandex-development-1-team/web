import { api } from '@/app/providers/axios'
import type { IBox } from '@/types/solutions'
import type { IUpdateBoxRequest } from '../ManageBoxModal/ManageBoxModal.type'

export const putBox = async (payload: IUpdateBoxRequest) => {
  const response = await api.put<Promise<Partial<IBox>>>(`/boxes/${payload.id}`, payload)

  if (!response.data) throw new Error('Error on box create')

  return response.data
}
