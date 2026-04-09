import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { BoxButton, Card, ToggleButton } from '@/components/ui'
import { SummaryCardsList } from '@/components/SummaryCarsdList'
import { CardLink, TeammateCard } from './ui'
import { CARDS } from './cards'
import { mockDaySummaryData, mockDayTeam, mockWeekSummaryData } from '@/mockData/mockStatsPageData'
import type { ToggleButtonState } from '@/components/ui/ToggleButton'

type PeriodType = 'day' | 'week'

const Stats = () => {
  const navigate = useNavigate()
  const [period, setPeriod] = useState<PeriodType>('day')

  const handleToggle = (side: ToggleButtonState) => {
    const newPeriod = side === 'left' ? 'day' : 'week'
    setPeriod(newPeriod)
  }

  const summaryData = period === 'day' ? mockDaySummaryData : mockWeekSummaryData

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-3 gap-[20px]">
        <BoxButton icon="box">Создать коробку</BoxButton>
        <BoxButton icon="special_projects">Создать спецпроект</BoxButton>
        <BoxButton icon="users" onClick={() => navigate(ROUTES.employeesCreate)}>
          Добавить пользователя
        </BoxButton>
        {CARDS.map(card => (
          <CardLink key={card.to} {...card} />
        ))}
      </div>
      <div className="flex gap-[20px]">
        <Card className="flex flex-col gap-[40px] p-[20px] pb-[32px] flex-1">
          <div className="flex justify-between">
            <h4 className="text-h4sb text-black-dark">Сводка</h4>
            <ToggleButton leftLabel="День" rightLabel="Неделя" onToggle={handleToggle} className="w-[229px]" />
          </div>
          <SummaryCardsList cards={summaryData} className="min-h-[176px]" />
        </Card>
        <Card className="flex flex-col gap-[12px] p-[20px] max-h-[314px] max-w-[500px] w-full">
          <h4 className="text-h4sb text-black-dark">Команда дня</h4>
          <ul className="flex flex-col gap-[16px] pr-[20px] overflow-y-auto">
            {mockDayTeam.map(teammate => (
              <li>
                <TeammateCard {...teammate} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export const Component = Stats
