import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import type { BoxStatus } from '../BoxSolutions.types'

const STATUS_MAP: Record<BoxStatus, { title: string; styles: string }> = {
  active: {
    title: 'Активен в боте',
    styles: 'bg-labels-yellow-light'
  },
  disable: {
    title: 'Не активен в боте',
    styles: 'bg-labels-grey-light'
  }
}

type LabelProps = {
  status: BoxStatus
} & ComponentProps<'div'>

export const StatusLabel = ({ status, className, ...props }: LabelProps) => {
  const label = STATUS_MAP[status]

  return (
    <div
      className={cn(
        'absolute max-w-max h-7 flex justify-center items-center text-text px-3 py-1 rounded-sm',
        label.styles,
        className
      )}
      {...props}
    >
      {label.title}
    </div>
  )
}
