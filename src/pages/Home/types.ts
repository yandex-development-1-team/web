export type StatusType = 'pending' | 'confirmed' | 'cancelled'

export const statuses: StatusType[] = ['pending', 'confirmed', 'cancelled']

export interface StatusProps {
  status: StatusType
}

export interface InlineStatusProps {
  initialStatus: StatusType
}

export interface BookingRequest {
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
