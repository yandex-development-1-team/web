export type StatusType = 'queue' | 'progress' | 'done'

export const statuses: StatusType[] = ['queue', 'progress', 'done']

export interface StatusProps {
  status: StatusType
}

export interface InlineStatusProps {
  initialStatus: StatusType
}

export interface BookingRequest {
  id: number
  date: string
  account: string
  clientName: string
  service: string
  projectName: string
  status: StatusType
  [key: string]: string | number
}

export interface FilterDropdownProps {
  className?: string
  onChange: (value: string) => void
}
