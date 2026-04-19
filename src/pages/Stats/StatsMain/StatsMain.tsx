import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { BoxButton, Card, ToggleButton } from '@/components/ui'
import { SummaryCardsList } from '@/components/SummaryCardsList'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { ProjectModal } from '@/pages/SpecialProjects/components'
import { CardLink, TeammateCard } from './ui'
import { useModal } from '@/components/ui/Modal/useModal'
import { useNotification } from '@/app/providers/notification'
import { CARDS } from './cards'
import { mockDaySummaryData, mockDayTeam, mockWeekSummaryData } from '@/mockData/mockStatsPageData'
import type { ToggleButtonState } from '@/components/ui/ToggleButton'
import type { BoxData } from '@/types/solutions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

type PeriodType = 'day' | 'week'

const Stats = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()

  const [period, setPeriod] = useState<PeriodType>('day')
  const { isOpen: isCreateBoxModalOpen, open: openCreateBoxModal, close: closeCreateBoxModal } = useModal()
  const { isOpen: isCreateProjectModalOpen, open: openCreateProjectModal, close: closeCreateProjectModal } = useModal()

  const { mutate: createBox } = useMutation({
    mutationFn: (payload: Partial<Omit<BoxData, 'id'>>) => api.post(API_ROUTES.boxes.get, payload),
    onSuccess: () => {
      showNotification({
        status: 'success',
        message: 'Коробочное решение успешно создано'
      })
      queryClient.invalidateQueries({ queryKey: ['boxSolutions'] })
      closeCreateBoxModal()
    },
    onError: () => {
      showNotification({
        status: 'error',
        message: 'Не удалось создать коробочное решение'
      })
    }
  })

  const handleToggle = (side: ToggleButtonState) => {
    const newPeriod = side === 'left' ? 'day' : 'week'
    setPeriod(newPeriod)
  }

  const handleBoxSave = (data: Partial<Omit<BoxData, 'id'>>) => {
    createBox(data)
  }

  const summaryData = period === 'day' ? mockDaySummaryData : mockWeekSummaryData

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-3 gap-[20px] max-[1250px]:grid-cols-2">
        <BoxButton icon="box" onClick={() => openCreateBoxModal()}>
          <span className="text-left">Создать коробку</span>
        </BoxButton>

        <BoxButton icon="special_projects" smallIcon onClick={() => openCreateProjectModal()}>
          <span className="text-left">Создать спецпроект</span>
        </BoxButton>

        <BoxButton icon="users" onClick={() => navigate(ROUTES.employeesCreate)}>
          <span className="text-left">Добавить пользователя</span>
        </BoxButton>
      </div>

      <div className="grid grid-cols-3 gap-[20px] max-[1250px]:grid-cols-2">
        {CARDS.map(card => (
          <CardLink key={card.to} {...card} />
        ))}
      </div>

      <div className="flex gap-[20px] max-[1200px]:flex-col">
        <Card className="flex flex-col gap-[40px] p-[20px] pb-[32px] flex-1">
          <div className="flex justify-between">
            <h4 className="text-h4sb text-black-dark">Сводка</h4>
            <ToggleButton leftLabel="День" rightLabel="Неделя" onToggle={handleToggle} className="w-[229px]" />
          </div>
          <SummaryCardsList cards={summaryData} className="min-h-[176px]" />
        </Card>

        <Card className="flex flex-col gap-[12px] p-[20px] max-h-[314px] flex-1">
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
      <ProjectModal isOpen={isCreateProjectModalOpen} onClose={closeCreateProjectModal} />
    </div>
  )
}

export const Component = Stats
