import { useState } from 'react'
import { statuses, type InlineStatusProps, type StatusType } from '../types'
import { Status } from './Status'

export const InlineStatus: React.FC<InlineStatusProps> = ({ initialStatus, onChange }) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(initialStatus)

  const handleSelect = (newStatus: StatusType) => {
    setStatus(newStatus)
    setOpen(false)
    onChange?.(newStatus)
  }

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        <Status status={status} />
      </div>

      {open && (
        <ul className="absolute top-full left-0 mt-1 w-[120px] bg-white border border-grey-light rounded  z-10000">
          {statuses.map(s => (
            <li
              key={s}
              onClick={() => handleSelect(s)}
              className={`px-3 py-1 text-xs cursor-pointer hover:bg-grey-blue-light`}
            >
              {s === 'queue' ? 'В очереди' : s === 'progress' ? 'В работе' : 'Готово'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
