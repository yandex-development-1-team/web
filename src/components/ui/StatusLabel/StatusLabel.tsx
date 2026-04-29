import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'

export type StatusSettings<T extends string> = Record<T, { title: string; styles: string }>

type LabelProps<T extends string> = {
  status: T
  settings: StatusSettings<T>
} & ComponentProps<'div'>

export const StatusLabel = <T extends string>({ settings, status, className, ...props }: LabelProps<T>) => {
  const config = settings[status]

  if (!config) return null

  return (
    <div
      className={cn(
        'absolute max-w-max h-7 flex justify-center items-center text-text px-3 py-1 rounded-sm',
        config.styles,
        className
      )}
      {...props}
    >
      {config.title}
    </div>
  )
}
