export type ApplicationStatus = 'queue' | 'in_progress' | 'done'

export type ApplicationType = 'box' | 'special_project'

export type ApplicatonSource = 'telegram_bot' | 'manual'

export interface Application {
  id: number
  type: ApplicationType
  source: ApplicatonSource
  customer_name: string
  project_name: string
  contact_info: string
  status: ApplicationStatus
  box_id: number | null
  special_project_id: number | null
  created_at: string // ISO date-time
  updated_at: string // ISO date-time
  created_by: number | null
}

export type ApplicationListItem = {
  id: number
  type: ApplicationType
  source: ApplicatonSource
  customer_name: string
  project_name: string
  contact_info: string
  status: ApplicationStatus
  created_at: string // ISO 8601 формат (date-time)
}

//TODO: моки
const STATUSES: ApplicationStatus[] = ['queue', 'in_progress', 'done']
const TYPES: ApplicationType[] = ['box', 'special_project']
const SOURCES: ApplicatonSource[] = ['telegram_bot', 'manual']

export const mockApplications: ApplicationListItem[] = Array.from({ length: 123 }, (_, index) => {
  const id = index + 1
  // Рандомная дата в пределах последних 30 дней
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 30))

  return {
    id,
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
    customer_name: `Клиент ${id}`,
    project_name: `Третьяковка №${1000 + id}`,
    contact_info: `+7 (900) ${String(id).padStart(3, '0')}-00-00`,
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    created_at: date.toISOString()
  }
})
