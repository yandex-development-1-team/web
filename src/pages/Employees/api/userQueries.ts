import { useNotification } from '@/app/providers/notification'
import { parseQueryParams } from '@/components/ui/Pagination'
import { USERS_KEYS } from '@/services/api/queryKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { UserStatus } from '../employees.types'
import { mapUserListDtoToUserList, mapUserWithDetailsDtoToUserWithDetails } from '../helpers'
import { employeesSearchParamsSchema } from '../schema'
import type { UserCreateOrUpdateRequestDto } from './types'
import { userApi } from './userApi'

export const useFetchUserList = () => {
  const [searchParams] = useSearchParams()
  const params = parseQueryParams(searchParams, employeesSearchParamsSchema)

  const { data, isPending } = useQuery({
    queryKey: [...USERS_KEYS.all, params],
    queryFn: meta => userApi.getUsers({ params }, meta),
    placeholderData: prev => prev,
    select: restData => {
      return { ...restData, users: mapUserListDtoToUserList(restData.users) }
    }
  })

  return {
    userList: data?.users ?? [],
    pagination: data?.pagination,
    isPending
  }
}

export const useFetchUser = (userId?: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: [...USERS_KEYS.details(userId)],
    queryFn: meta => userApi.getUserById(meta, userId),
    select: data => mapUserWithDetailsDtoToUserWithDetails(data),
    enabled: !!userId
  })

  return {
    user: data,
    userId,
    isPending,
    error
  }
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (user: UserCreateOrUpdateRequestDto) => userApi.createUser(user),
    onSuccess: async data => {
      showNotification({
        message: 'Пользователь создан!',
        status: 'success'
      })
      await queryClient.invalidateQueries({ queryKey: USERS_KEYS.all })
      if (data.id) navigate(`/employees/${data.id}`)
    },
    onError: () => {
      showNotification({
        message: `Ошибка при создании пользователя!`,
        status: 'error'
      })
    }
  })
}

export const useUpdateUserStatus = ({ userId, queryKey }: { userId?: string; queryKey: readonly string[] }) => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (status: UserStatus) => userApi.updateUserStatus({ userId, status }),
    onSuccess: async () => {
      showNotification({
        message: 'Статус изменён!',
        status: 'success'
      })
      await queryClient.invalidateQueries({ queryKey })
    },
    onError: () => {
      showNotification({
        message: 'Ошибка изменения статуса!',
        status: 'error'
      })
    }
  })

  return {
    isStatusPending: isPending,
    toggleStatus: mutateAsync
  }
}

export const useUpdateUser = (userId?: string) => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (user: UserCreateOrUpdateRequestDto) => userApi.updateUser({ user, userId }),
    onSuccess: async () => {
      showNotification({
        message: 'Статус обновлен!',
        status: 'success'
      })
      await queryClient.invalidateQueries({ queryKey: USERS_KEYS.all })
      navigate(`/employees/${userId}`)
    },
    onError: () => {
      showNotification({
        message: 'Ошибка при обновлении пользователя!',
        status: 'error'
      })
    }
  })
}
