import { BoxButton, Button, DataTable } from '@/components/ui'
import { Application2 } from '@/assets/icons'
import { useState } from 'react'
import { useModal } from '@/components/ui/Modal/useModal'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { SpecialProjectModal } from '@/components/SpecialProjectModal/SpecialProjectModal'
import FilterDropdown from './ui/FilterDropdown'
import { headerTableData } from './homePageData'
import type { BoxData } from '@/types/solutions'
import { usePermissions, PERMISSIONS } from '@/hooks/usePermissions'
import { useBookingRequests } from '@/hooks/useBookingRequests'
import type { Column } from '@/components/ui/DataTable/DataTable.types'

const Home = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const { isOpen: isCreateBoxModalOpen, open: openCreateBoxModal, close: closeCreateBoxModal } = useModal()
  const { isOpen: isCreateProjectModalOpen, open: openCreateProjectModal, close: closeCreateProjectModal } = useModal()
  const { data = [] } = useBookingRequests()
  const [visibleCount, setVisibleCount] = useState(8)
  const filteredData = statusFilter === 'all' ? data : data.filter(item => item.status === statusFilter)

  const preparedData = filteredData.map((item, index) => ({
    ...item,
    id: index
  }))

  const visibleData = preparedData.slice(0, visibleCount)
  const countQueue = preparedData.filter(item => item.status === 'pending').length
  const countInProgress = preparedData.filter(item => item.status === 'confirmed').length
  const countСancelled = preparedData.filter(item => item.status === 'cancelled').length

  const stats = [
    { title: 'Новые заявки', value: countQueue },
    { title: 'Заявки в работе', value: countInProgress }
  ]

  const handleBoxCreate = () => {
    openCreateBoxModal()
  }

  const handleSpecProjectCreate = () => {
    openCreateProjectModal()
  }

  const handleBoxSave = (data: Partial<Omit<BoxData, 'id'>>) => {
    void data
    closeCreateBoxModal()
  }

  const { hasAccess } = usePermissions()

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-h2">Главная страница</h2>

      <div className="flex gap-[20px] items-end">
        {stats.map((stat, index) => (
          <div key={stat.title} className="flex flex-col flex-1">
            <span className="text-h5 mb-[8px] text-text-grey-dark">{stat.title}</span>

            <Button
              className={`h-[92px] text-[48px] font-bold ${index === 1 ? 'bg-white border border-grey-light' : ''}`}
            >
              {stat.value}
            </Button>
          </div>
        ))}

        {hasAccess(PERMISSIONS.boxesCreate) && (
          <BoxButton onClick={handleBoxCreate} icon="box" className="max-w-[407px]">
            Создать коробку
          </BoxButton>
        )}
      </div>

      <div className="flex gap-[20px] h-[92px]">
        <div className="flex justify-between items-center flex-1 border bg-white  border-grey-light  rounded-[8px] px-[43px] min-w-[468px] ">
          <div className="flex items-center lg:gap-[12px] gap-[3px]">
            <Application2 width={32} height={32} />
            <span className="text-h5 font-semibold">Мои заявки</span>
          </div>

          <div className="flex lg:gap-[20px] gap-[10px]">
            <div className="flex flex-col justify-center items-center min-w-[100px] lg:gap-[4px] gap-[2px] xl:min-w-[185px] text-text-grey-dark">
              <span className="text-h5 ">В работе: </span>
              <span className="text-h3 font-bold">{countInProgress}</span>
            </div>

            <div className="flex flex-col justify-center items-center min-w-[100px] gap-[4px] max-w-[185px] text-text-grey-dark ">
              <span className="text-h5 ">Обработаны: </span>
              <span className="text-h3 font-bold">{countСancelled}</span>
            </div>
          </div>
        </div>

        {hasAccess(PERMISSIONS.specprojectsEdit) && (
          <BoxButton onClick={handleSpecProjectCreate} icon="special_projects" className="max-w-[407px]">
            Создать спецпроект
          </BoxButton>
        )}
      </div>

      <div className="bg-white p-[24px] rounded-[12px]">
        <h3 className="mb-[12px] text-h3">Заявки на бронирование</h3>

        <div className="min-w-[320px]">
          <div className="flex flex-col gap-[4px] mb-[19px]">
            <span className="text-xxs text-text-grey-dark">Фильтр</span>
            <FilterDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              className="text-text-grey-light text-small italic px-[6px] py-[12px] border border-grey-light rounded-[8px] pl-[12px] xl:min-w-[494px]  md:min-w-[320px] bg-white"
            />
          </div>
          <DataTable
            idKey="id"
            data={visibleData as unknown as Record<string, unknown>[]}
            enableLoadMore
            columns={headerTableData as unknown as Column<Record<string, unknown>>[]}
          />
        </div>
        {visibleCount < preparedData.length && (
          <div className="flex justify-end mt-[10px]">
            <button onClick={() => setVisibleCount(prev => prev + 8)} className="text-h5 text-grey-dark underline">
              Показать больше
            </button>
          </div>
        )}
      </div>

      {isCreateBoxModalOpen && (
        <BoxSolutionModal isOpen={isCreateBoxModalOpen} onClose={closeCreateBoxModal} onSave={handleBoxSave} />
      )}
      <SpecialProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={closeCreateProjectModal}
        onSubmit={closeCreateProjectModal}
        modalTitle={'Создать спецпроект'}
      />
    </div>
  )
}
export const Component = Home
