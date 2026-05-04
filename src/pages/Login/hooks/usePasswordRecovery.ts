import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/app/providers/notification'
import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import { useAxiosVerboseError, type AxiosVerboseError } from '@/hooks/useAxiosVerboseError'

export const postPasswordRecovery = (email: string) => {
  const data = {
    email
  }
  return api.post<void>(API_ROUTES.passwordRecovery, data)
}

export const usePasswordRecovery = () => {
  const { showNotification } = useNotification()
  const showError = useAxiosVerboseError()

  const mutation = useMutation({
    mutationFn: postPasswordRecovery,
    onSuccess: () => {
      showNotification({
        status: 'success',
        message: 'Если email существует, ссылка для восстановления пароля отправлена'
      })
    },
    onError: error => showError(error as AxiosVerboseError)
  })

  return {
    send: mutation.mutateAsync,
    isPending: mutation.isPending
  }
}
