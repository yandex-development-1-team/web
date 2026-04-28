export const statuses = ['pending', 'confirmed', 'cancelled'] as const

export type StatusType = (typeof statuses)[number]

export interface StatusProps {
  status: StatusType
}

export interface InlineStatusProps {
  initialStatus: StatusType
}

export interface BookingRequest {
  id: number
  telegram_nick: string
  name: string
  service_type: string
  service_name: string
  status: StatusType
  created_at: string
}

export interface FilterDropdownProps {
  value: string
  className?: string
  onChange: (value: string) => void
}

export type BookingResponse = {
  overview: {
    new_applications: number
    in_progress_applications: number
  }
  manager_stats: {
    in_progress: number
    processed: number
  }
  applications: BookingRequest[]
}
