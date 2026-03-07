export type BoxStatus = 'active' | 'hidden' | 'draft' | 'processed'

export interface IBox {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string // Базовая дата (DDMMYYYY)
  time: string // Базовое время начала (HH:MM)
  location: string
  price: number
  image: string
  status: BoxStatus
  organizer: string
  created_at: string
  updated_at: string
  created_by: number // ID менеджера/админа
}
