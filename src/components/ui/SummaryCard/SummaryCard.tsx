import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { type SummaryCardType } from './SummaryCard.types'

export type SummaryCardProps = { data: SummaryCardType } & ComponentProps<'div'>

export const SummaryCard = ({ data, className, ...props }: SummaryCardProps) => {
  const { title, value } = data
  const isAccent = value < 5
  return (
    <div className={cn('flex-1 shrink text-text w-full min-w-38 max-w-82 min-h-32', className)} {...props}>
      <p className="text-xxs mb-2">{title}</p>
      <div className={cn('flex justify-center items-center', 'border border-grey-light rounded-lg', 'bg-white h-full')}>
        <span className={`text-indicator-st ${isAccent ? 'text-red-dark' : 'text-text'}`}>{value}</span>
      </div>
    </div>
  )
}
