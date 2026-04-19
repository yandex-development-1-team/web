export type TSpecialProjectResponse = {
  id: number
  title: string
  description: string
  image: string // uri
  is_active_in_bot: boolean
  created_at: string //date-time
  updated_at: string // date-time
}

export type TSpecialProjectListItemResponse = {
  id: number
  title: string
  is_active_in_bot: boolean
}

export type TSpecialProjectCreateRequest = {
  title: string // require
  description: string
  image: string // uri
  is_active_in_bot: boolean
}

export interface ISpecialProjectUpdateRequest extends TSpecialProjectCreateRequest {
  id: number
}

export interface ISpecialProjectsResponse {
  items: TSpecialProjectListItemResponse[]
  pagination: {
    limit: number
    offset: number
    total: number
  }
}

export type TQueryParams = {
  status: 'active' | 'inactive'
  search: string
  limit: number
  offset: number
}
