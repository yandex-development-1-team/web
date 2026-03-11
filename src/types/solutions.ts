export interface BoxData {
  id: number
  name: string
  isActive: boolean
  date: string | undefined // ISO формат "2024-03-10"
  startTime: string | undefined // "00:00"
  endTime: string | undefined // "00:00"
  location: string
  description: string
  rules: string
  cost: string
  organizer: string
  image?: string
}

export interface IProject {
  id: number
  name: string
}
