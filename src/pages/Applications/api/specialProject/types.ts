import type { PaginationDTO, StatusDTO } from '../types'

export interface ApplicationListItemDTO {
  id: number
  status: StatusDTO
  manager_id: number
  manager_name: string
  customer_name: string
  contact_info: string
  created_at: string
}

export interface ApplicationListResponseDTO {
  items: ApplicationListItemDTO[]
  pagination: PaginationDTO
}

export interface ApplicationDTO {
  id: number
  status: StatusDTO
  manager_id: number
  manager_name: string
  form_answer_id: string
  customer_name: string
  contact_info: string
  description?: string
  created_at: string
  updated_at: string
}
