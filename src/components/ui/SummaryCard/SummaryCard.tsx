import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { type SummaryCardType } from './SummaryCard.types'

export type SummaryCardProps = { data: SummaryCardType } & ComponentProps<'div'>

export const SummaryCard = ({ data, className, ...props }: SummaryCardProps) => {
  const { title, value, warningColor, largeValueSize } = data

  return (
    <div className={cn('flex flex-col gap-2 text-text w-full min-w-30', className)} {...props}>
      <p className="text-xxs">{title}</p>
      <div className={cn('flex justify-center items-center', 'border border-grey-light rounded-lg', 'bg-white h-full')}>
        <span
          className={`${largeValueSize ? 'text-indicator' : 'text-indicator-st'} 
          ${warningColor ? 'text-red-dark' : 'text-text'}`}
        >
          {value}
        </span>
      </div>
    </div>
  )
}
