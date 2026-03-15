import { SummaryCardsList } from '@/components/SummaryCarsdList/SummaryCardsList'
import type { SummaryCardType } from '@/components/ui/SummaryCard/SummaryCard.types'

const mockSummaryCards: SummaryCardType[] = [
  {
    title: 'Средняя посещаемость',
    value: 87
  },
  {
    title: 'Часы в работе',
    value: 164
  },
  {
    title: 'Завершено задач',
    value: 4
  },
  {
    title: 'Эффективность',
    value: 9.4
  }
]

const Attendance = () => {
  return (
    <>
      <h1>Средняя посещаемость на коробку</h1>
      <p>Страница в разработке...</p>

      <SummaryCardsList cards={mockSummaryCards}></SummaryCardsList>
    </>
  )
}

export const Component = Attendance
