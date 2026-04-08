import type { SummaryCardType } from '@/components/ui/SummaryCard'

export const mockDaySummaryData: SummaryCardType[] = [
  {
    title: 'Принято заявок',
    value: 12,
    largeValueSize: true
  },
  {
    title: 'В работе',
    value: 6,
    largeValueSize: true
  },
  {
    title: 'Обработано заявок',
    value: 3,
    largeValueSize: true
  }
]

export const mockWeekSummaryData: SummaryCardType[] = [
  {
    title: 'Принято заявок',
    value: 100,
    largeValueSize: true
  },
  {
    title: 'В работе',
    value: 10,
    largeValueSize: true
  },
  {
    title: 'Обработано заявок',
    value: 25,
    largeValueSize: true
  }
]
