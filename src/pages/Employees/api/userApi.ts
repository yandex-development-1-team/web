import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { UserStatus } from '../employees.types'
import type { EmployeesSearchParamsType } from '../schema'
import type {
  ImageFileUploadResponseDto,
  UserChangeStatusResponseDto,
  UserCreateOrUpdateRequestDto,
  UserListResponseDto,
  UserResponseDto,
  UserWithDetailsResponseDto
} from './types'

export const userApi = {
  getUsers: async ({ params }: { params: EmployeesSearchParamsType }, { signal }: { signal: AbortSignal }) => {
    const { data } = await api.get<UserListResponseDto>(API_ROUTES.users.get, { params, signal })

    return {
      users: data.items,
      pagination: data.pagination
    }
  },

  getUserById: async ({ signal }: { signal: AbortSignal }, userId?: string) => {
    if (!userId) throw new Error('EmployeeId is required!')
    const { data } = await api.get<UserWithDetailsResponseDto>(API_ROUTES.users.byId(userId), { signal })

    return data
  },

  updateUserStatus: async ({ userId, status }: { userId?: string; status: UserStatus }) => {
    if (!userId) throw new Error('UserId is required for update')
    const { data } = await api.put<UserChangeStatusResponseDto>(API_ROUTES.users.status(userId), { status })

    return data
  },

  createUser: async (user: UserCreateOrUpdateRequestDto) => {
    const { data } = await api.post<UserResponseDto>(API_ROUTES.users.create, user)
    return data
  },

  getUserImage: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<ImageFileUploadResponseDto>(API_ROUTES.imageUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
  },

  updateUser: async ({ user, userId }: { user: UserCreateOrUpdateRequestDto; userId?: string }) => {
    if (!userId) throw new Error('userId is required!')
    const { data } = await api.put<UserResponseDto>(API_ROUTES.users.byId(userId), user)

    return data
  }
}
