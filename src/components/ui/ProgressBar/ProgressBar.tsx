import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'

type TProgressBar = ComponentProps<'div'> & {
  progress: number
}

export const ProgressBar = ({ progress = 0, className, ...props }: TProgressBar) => {
  const isIndeterminate = progress === 0

  return (
    <div className={cn('w-full absolute h-1 overflow-hidden bottom-1', className)} {...props}>
      {isIndeterminate ? (
        <div className="animate-slow-slide w-5/10 h-1 rounded bg-yellow-accent-dark" />
      ) : (
        <div
          className={`bg-yellow-accent-dark h-full transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  )
}
