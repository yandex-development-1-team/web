type UserRole = 'admin' | 'manager_1' | 'manager_2' | 'manager_3' | 'user'
type UserStatus = 'active' | 'blocked' | 'invited'

export type UserListItemResponseDto = {
  id: number
  telegram_nick: string
  first_name: string
  last_name: string
  second_name: string
  role: UserRole
  status: UserStatus
  department: string
  supervisor: string
  position: string
  phone_number: string
  email: string
  created_at: string
}

export type PaginationResponseDto = {
  total: number
  limit: number
  offset: number
}

export type UserListResponseDto = {
  items: UserListItemResponseDto[]
  pagination: PaginationResponseDto
}

export type UserChangeStatusResponseDto = {
  id: number
  status: UserStatus
  updated_at: string
}

export interface UserWithDetailsResponseDto extends UserListItemResponseDto {
  address: string
  updated_at: string
  bookings: {
    id: number
    event_id: number
    box_name?: string
    date?: string
    time?: string
    status?: string
  }[]
  visit_history: {
    box_name?: string
    visited_at?: string
  }[]
  favorite_boxes: number[]
  image: string
}

export type UserCreateOrUpdateRequestDto = {
  first_name: string
  last_name: string
  second_name: string
  email: string
  role: UserRole
  status: UserStatus
  phone_number: string
  department: string
  position: string
  supervisor: string
  address: string
  image?: string
}

export interface UserResponseDto {
  id: number
  telegram_nick: string
  name: string
  last_name: string
  second_name: string
  email: string
  phone_number: string
  role: UserRole
  status: UserStatus
  department: string
  position: string
  supervisor: string
  address: string
  image: string
  invite_token: string
  created_at: string
  updated_at: string
}

export interface ImageFileUploadResponseDto {
  uuid: string
  url: string
  filename: string
}
