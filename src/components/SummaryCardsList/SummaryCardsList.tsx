import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { SummaryCard } from '../ui/SummaryCard'
import type { SummaryCardType } from '../ui/SummaryCard/SummaryCard.types'

export type SummaryCardsListProps = {
  cards: SummaryCardType[]
} & ComponentProps<'div'>

export const SummaryCardsList = ({ cards, className, ...props }: SummaryCardsListProps) => {
  return (
    <div className={cn('flex gap-5', className)} {...props}>
      {cards.map((card, index) => {
        return <SummaryCard data={card} key={index} />
      })}
    </div>
  )
}
