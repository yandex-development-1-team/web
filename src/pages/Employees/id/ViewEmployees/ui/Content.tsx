import { cn } from '@/lib/utils.clsx'
import type { ComponentProps, ReactNode } from 'react'

type TContentProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const Content = ({ children, className, ...props }: TContentProps) => {
  return (
    <div
      className={cn(
        'w-full h-auto mt-5 grid gap-5 max-h-max',
        'grid-cols-1',
        'min-[1440px]:grid-cols-[382px_1fr]',
        'min-w-175',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
