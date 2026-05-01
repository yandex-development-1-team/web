import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/app/providers/notification'
import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import { useAxiosVerboseError, type AxiosVerboseError } from '@/hooks/useAxiosVerboseError'

export const postPasswordReset = (token: string, password: string) => {
  const data = {
    token,
    password
  }
  return api.post<void>(API_ROUTES.passwordReset, data)
}

export const usePasswordReset = () => {
  const { showNotification } = useNotification()
  const showError = useAxiosVerboseError()

  const mutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) => postPasswordReset(token, password),
    onSuccess: () => {
      showNotification({
        status: 'success',
        message: 'Новый пароль сохранен'
      })
    },
    onError: error => showError(error as AxiosVerboseError)
  })

  return {
    send: mutation.mutateAsync,
    isPending: mutation.isPending
  }
}
