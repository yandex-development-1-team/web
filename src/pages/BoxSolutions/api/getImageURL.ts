import { api } from '@/app/providers/axios'

// export interface FileUploadResponse {
//   uuid: string
//   url: string
//   filename: string
// }

export interface FileUploadResponse {
  image_url: string
}
export const getImageURL = async (id: string, fileList: FileList) => {
  const formData = new FormData()
  const fileToUpload = fileList[0]

  if (!fileToUpload) {
    console.error('Файл не найден')
    return
  }

  formData.append('image', fileToUpload)
  // '/files/upload'
  const response = await api.post<FileUploadResponse>(`/boxes/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  console.log(response)

  return response.data
}

// {
//     "uuid": "a54ac215-1036-449d-8fa2-7c1514cc6da3",
//     "url": "http://127.0.0.1:9000/uploads/a54ac215-1036-449d-8fa2-7c1514cc6da3.jpg",
//     "filename": "cropped.jpg"
// }
