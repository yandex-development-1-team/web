import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { BoxButton, Card, ToggleButton } from '@/components/ui'
import { SummaryCardsList } from '@/components/SummaryCardsList'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { CardLink, TeammateCard } from './ui'
import { useModal } from '@/components/ui/Modal/useModal'
import { CARDS } from './cards'
import { mockDaySummaryData, mockDayTeam, mockWeekSummaryData } from '@/mockData/mockStatsPageData'
import type { ToggleButtonState } from '@/components/ui/ToggleButton'
import type { BoxData } from '@/types/solutions'

type PeriodType = 'day' | 'week'

const Stats = () => {
  const navigate = useNavigate()

  const [period, setPeriod] = useState<PeriodType>('day')
  const { isOpen: isCreateBoxModalOpen, open: openCreateBoxModal, close: closeCreateBoxModal } = useModal()

  const handleToggle = (side: ToggleButtonState) => {
    const newPeriod = side === 'left' ? 'day' : 'week'
    setPeriod(newPeriod)
  }

  const handleBoxSave = (data: Partial<Omit<BoxData, 'id'>>) => {
    console.log(data)
    closeCreateBoxModal()
  }

  const summaryData = period === 'day' ? mockDaySummaryData : mockWeekSummaryData

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-3 gap-[20px]">
        <BoxButton icon="box" onClick={() => openCreateBoxModal()} className="max-[1070px]:px-[10px]">
          <span className="text-left max-[1140px]:text-xs">Создать коробку</span>
        </BoxButton>

        <BoxButton icon="special_projects" smallIcon className="max-[1070px]:px-[10px]">
          <span className="text-left max-[1140px]:text-xs">Создать спецпроект</span>
        </BoxButton>

        <BoxButton icon="users" onClick={() => navigate(ROUTES.employeesCreate)} className="max-[1070px]:px-[10px]">
          <span className="text-left max-[1140px]:text-xs">Добавить пользователя</span>
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
            {mockDayTeam.map((teammate, index) => (
              <li key={index}>
                <TeammateCard {...teammate} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {isCreateBoxModalOpen && (
        <BoxSolutionModal isOpen={isCreateBoxModalOpen} onClose={closeCreateBoxModal} onSave={handleBoxSave} />
      )}
    </div>
  )
}

export const Component = Stats
