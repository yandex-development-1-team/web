import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'

export const Loader = (props: ComponentProps<'div'>) => {
  const { className, ...otherProps } = props
  return (
    <div className={cn('flex items-center justify-center', className)} {...otherProps}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-accent-dark border-t-transparent"></div>
    </div>
  )
}
