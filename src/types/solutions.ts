export interface BoxData {
  id: number
  name: string
  isActive: boolean
  date?: string // ISO формат "2024-03-10"
  startTime?: string // "00:00"
  endTime?: string // "00:00"
  location: string
  description: string
  rules: string
  cost: string
  organizer: string
}

export interface IProject {
  id: number
  name: string
}
