import type { StatusProps } from '../types'
export type ApplicationStatus = 'pending' | 'confirmed' | 'cancelled'

const statusStyles: Record<ApplicationStatus, string> = {
  pending: 'bg-status-queue-bg text-status-queue-text',
  confirmed: 'bg-status-progress-bg text-status-progress-text',
  cancelled: 'bg-status-done-bg text-status-done-text'
}

const statusLabels = {
  pending: 'В очереди',
  confirmed: 'В работе',
  cancelled: 'Отменённые'
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  const safeStatus = status in statusStyles ? status : 'pending'

  return (
    <div className="flex items-center justify-between w-[120px]">
      <p className={`px-[12px] py-[6px] rounded-[4px] max-w-[113px] text-xs font-medium ${statusStyles[safeStatus]}`}>
        {statusLabels[safeStatus]}
      </p>
    </div>
  )
}
