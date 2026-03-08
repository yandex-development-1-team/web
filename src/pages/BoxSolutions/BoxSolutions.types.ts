export type BoxStatus = 'active' | 'inactive'

export interface IBox {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string // DDMMYYYY
  time: string // HH:MM
  location: string
  price: number
  image: string
  status: BoxStatus
  organizer: string
  created_at: string
  updated_at: string
  created_by: number // ID менеджера/админа
}
