import { ArrowIcon } from '@/assets/icons'

type StatusType = 'queue' | 'progress' | 'done'

export interface StatusProps {
  status: StatusType
}

const statusStyles = {
  queue: 'bg-yellow-light text-yellow-dark',
  progress: 'bg-green-light text-green-dark',
  done: 'bg-blue-light text-blue-dark'
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
