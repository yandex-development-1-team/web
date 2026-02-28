// import { api } from '@/app/providers/axios'

export const deleteFile = async (id: string) => {
  // const response = await api.delete(`/api/v1/delete/${id}`)
  // return response.data

  // const fakeResponse = { data: { message: `Deleted ${id}` }, status: 200 }
  await new Promise(res => setTimeout(res, 300))
  // if (!fakeResponse.data) return
  // return fakeResponse.data

  throw {
    response: {
      data: { message: `Server Error: Failed to delete file ${id}` },
      status: 500
    }
  }
}
