import { ArrowIcon } from '@/assets/icons'
import type { StatusProps } from '../types'

const statusStyles = {
  queue: 'bg-status-queue-bg text-status-queue-text',
  progress: 'bg-status-progress-bg text-status-progress-text',
  done: 'bg-status-done-bg text-status-done-text'
}

const statusLabels = {
  queue: 'В очереди',
  progress: 'В работе',
  done: 'Готово'
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <div className="flex items-center justify-between w-[120px] ">
      <p className={` px-[12px] py-[6px] rounded-[4px] max-w-[113px] text-xs font-medium ${statusStyles[status]}`}>
        {statusLabels[status]}
      </p>
      <div>
        <ArrowIcon width={24} />
      </div>
    </div>
  )
}
