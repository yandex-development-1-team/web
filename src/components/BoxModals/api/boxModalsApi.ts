import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { BoxSolutionModalData, ICreateBoxRequest, IUpdateBoxRequest } from '../BoxManageModal/boxManageModal.type'
import { mapIBoxToModalData } from '../helpers/helpers'
import type { FileUploadResponse, IBoxDTO } from './type'

export const createBox = async (payload: ICreateBoxRequest) => {
  const response = await api.post<Promise<IBoxDTO>>(API_ROUTES.boxes.create, payload)
  if (!response.data) throw new Error('Error on box create')
  return response.data
}

export const editBox = async (payload: IUpdateBoxRequest) => {
  const response = await api.put<IBoxDTO>(API_ROUTES.boxes.byId(payload.id), payload)
  if (!response.data) throw new Error('Failed to update box')
  return response.data
}

export const fetchImageUrl = async (fileList: FileList) => {
  const fileToUpload = fileList[0]
  if (!fileToUpload) {
    throw new Error('No file selected for upload ')
  }

  const formData = new FormData()
  formData.append('file', fileToUpload)

  const response = await api.post<FileUploadResponse>(API_ROUTES.imageUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return response.data
}

export const getBox = async (boxId: string | null): Promise<BoxSolutionModalData | undefined> => {
  if (!boxId) return
  const response = await api.get<IBoxDTO>(API_ROUTES.boxes.byId(boxId))
  if (!response.data) throw new Error('Faild to get box')
  return mapIBoxToModalData(response.data)
}
