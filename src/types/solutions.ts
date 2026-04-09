export interface TimeSlot {
  date: string // ISO формат "2024-03-10"
  time_from: string // "00:00"
  time_to: string // "00:00"
}

export type BoxData = {
  id: number
  name: string
  slug: string
  description: string
  rules: string
  date: string
  time_slots: TimeSlot[]
  location: string
  price: number
  image: string
  is_active_in_bot: boolean
  organizer: string
  created_at: string
  updated_at: string
  created_by: number
}

export interface IProject {
  id: number
  title: string
  description: string
  image: string
  isActive: boolean
}

export interface IBox extends IProject {
  rules: string
}
