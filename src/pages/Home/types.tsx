export type StatusType = 'queue' | 'progress' | 'done'

export interface InlineStatusProps {
  initialStatus: StatusType
  onChange?: (newStatus: StatusType) => void
}

export const statuses: StatusType[] = ['queue', 'progress', 'done']

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
