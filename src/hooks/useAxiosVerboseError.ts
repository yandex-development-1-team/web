import type { AxiosError } from 'axios'
import { useNotification } from '@/app/providers/notification'

export type AxiosVerboseError = AxiosError<{ errors?: string[] }>

export const useAxiosVerboseError = () => {
  const { showNotification } = useNotification()
  return (error: AxiosVerboseError) => {
    const statusMessage = 'Ошибка' + (error.status ? ` ${error.status}` : '')
    const serverMessage = error.response?.data?.errors?.join('. ') || statusMessage
    showNotification({
      status: 'error',
      message: serverMessage
    })
  }
}
