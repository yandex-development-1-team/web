export interface IProject {
  id: number
  title: string
  description: string
  image: string
  isActive: boolean
}

export interface TimeSlot {
  date: string // ISO формат "2024-03-10"
  time_from: string // "00:00"
  time_to: string // "00:00"
}

export interface BoxData {
  id: number
  name: string
  is_active_in_bot: boolean
  time_slots: TimeSlot[]
  location: string
  description: string
  rules: string
  cost: number
  organizer: string
  image?: string
}

export interface IBox extends IProject {
  rules: string
}
