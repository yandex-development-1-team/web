export type StatusType = 'queue' | 'progress' | 'done'

export interface StatusProps {
  status: StatusType
}

export interface InlineStatusProps {
  initialStatus: StatusType
  onChange: (status: StatusType) => void
}

export const statuses: StatusType[] = ['queue', 'progress', 'done']
