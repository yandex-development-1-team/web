export type BoxStatus = 'active' | 'disable'

export interface IBox {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string
  time: string
  location: string
  price: number
  image: string
  status: BoxStatus
  organizer: string
  created_at: string
  updated_at: string
  created_by: number
}

export interface IPagination {
  limit: number
  offset: number
  total: number
}

export type ModalState = { type: 'delete' | 'edit'; id: number } | { type: 'create'; id: null } | null
