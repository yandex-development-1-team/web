import type { PaginationDTO, StatusDTO } from '../types'

export interface BookingListItemDTO {
  id: number
  status: StatusDTO
  guest_name: string
  guest_contact: string
  service_name: string
  manager_id: number
  manager_name: string
  created_at: string
}

export interface BookingListResponseDTO {
  items: BookingListItemDTO[]
  pagination: PaginationDTO
}

export interface BookingDTO {
  id: number
  user_id: number
  service_id: number
  service_name: string
  booking_date: string
  booking_time: string
  guest_name: string
  guest_organization: string
  guest_contact: string
  guest_position: string
  status: StatusDTO
  manager_id: number
  manager_name: string
  created_at: string
  updated_at: string
}
