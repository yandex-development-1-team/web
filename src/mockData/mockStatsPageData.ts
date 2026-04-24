import type { SummaryCardType } from '@/components/ui/SummaryCard'
import type { TeammateCardType } from '@/pages/Stats/StatsMain/ui/TeammateCard/TeammateCard.types'

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

export const mockDayTeam: TeammateCardType[] = [
  {
    name: 'Иванов Илья',
    grade: 1,
    isActive: true,
    email: 'example@example.com',
    phone: '+79991234567'
  },
  {
    name: 'Огурцов Никита',
    grade: 2,
    isActive: false,
    email: 'cucumber@example.com',
    phone: '+79998765432'
  },
  {
    name: 'Пупыркина Светлана',
    grade: 3,
    isActive: true,
    email: 'pup@example.com',
    phone: '+79997654321'
  }
]
