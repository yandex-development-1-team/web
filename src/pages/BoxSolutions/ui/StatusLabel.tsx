import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import type { StatusType } from '../BoxSolutions.types'

const STATUS_MAP: Record<StatusType, { title: string; styles: string }> = {
  active: {
    title: 'Активен в боте',
    styles: 'bg-labels-yellow-light'
  },
  inactive: {
    title: 'Не активен в боте',
    styles: 'bg-labels-grey-light'
  }
}

type LabelProps = {
  status: StatusType
} & ComponentProps<'div'>

export const StatusLabel = ({ status, className, ...props }: LabelProps) => {
  const { styles, title } = STATUS_MAP[status]

  return (
    <div
      className={cn(
        'absolute max-w-max h-7 flex justify-center items-center text-text px-3 py-1 rounded-sm',
        styles,
        className
      )}
      {...props}
    >
      {title}
    </div>
  )
}
