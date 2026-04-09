import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'

const STATUS_MAP: Record<string, { title: string; styles: string }> = {
  true: {
    title: 'Активен в боте',
    styles: 'bg-labels-yellow-light'
  },
  false: {
    title: 'Не активен в боте',
    styles: 'bg-labels-grey-light'
  }
}

type LabelProps = {
  isActive: boolean
} & ComponentProps<'div'>

export const StatusLabel = ({ isActive, className, ...props }: LabelProps) => {
  const { styles, title } = STATUS_MAP[String(isActive)]

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
