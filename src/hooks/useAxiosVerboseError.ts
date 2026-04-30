import type { AxiosError } from 'axios'
import { useNotification } from '@/app/providers/notification'

export type AxiosVerboseError = AxiosError<{ errors?: string[] }>

export const useAxiosVerboseError = () => {
  const { showNotification } = useNotification()
  return (error: AxiosVerboseError) => {
    const serverMessage = error.response?.data?.errors?.[0] || 'Ошибка'
    showNotification({
      status: 'error',
      message: serverMessage
    })
  }
}
