import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils.clsx'

interface InfoBlockProps extends React.PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  title: string
  className?: string
  classNameContent?: string
}

export function InfoBlock({ title, children, className, classNameContent, ...props }: InfoBlockProps) {
  return (
    <div className={cn('flex flex-col gap-3 flex-1', className)} {...props}>
      <h3 className="text-h3 text-black">{title}</h3>
      <div
        className={cn(
          'rounded-lg border border-grey-light min-h-36.25 bg-white flex items-center justify-center',
          classNameContent
        )}
      >
        {children}
      </div>
    </div>
  )
}
