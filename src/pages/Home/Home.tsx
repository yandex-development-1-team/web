import { BoxButton, DataTable } from '@/components/ui'
import { Application2 } from '@/assets/icons'
import { useState } from 'react'
import { SpecialProjectModal } from '@/components/SpecialProjectModal/SpecialProjectModal'
import FilterDropdown from './ui/FilterDropdown'
import { usePermissions, PERMISSIONS } from '@/hooks/usePermissions'
import { useBookingRequests } from '@/hooks/useBookingRequests'
import { headerTableData } from './homePageData'
import { useCreateSpecialProject } from '@/pages/SpecialProjects/hooks/useCreateSpecialProject'
import { mapProjectToCreateData } from '@/pages/SpecialProjects/api/specProject.mappers'
import { type IProject } from '@/types/solutions'
import { ManageBoxModal } from '@/components/BoxModals'
import { BOX_SOLUTIONS_KEYS } from '@/services/api/queryKeys'

const Home = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const { data } = useBookingRequests()
  const PAGE_SIZE = 8
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const [projectToEdit, setProjectToEdit] = useState<null | undefined>(null)
  const { mutate: createSpecProject } = useCreateSpecialProject()
  const [modal, setModal] = useState<'create' | null>(null)

  const managerStats = {
    process: data?.manager_stats.processed,
    progress: data?.manager_stats.in_progress
  }

  const applications = data?.applications ?? []
  const filteredData = statusFilter === 'all' ? applications : applications.filter(item => item.status === statusFilter)
  const preparedData = filteredData.map((item, index) => ({
    ...item,
    id: index
  }))
  const visibleData = preparedData.slice(0, visibleCount)

  const stats = [
    { title: 'Новые заявки', value: managerStats.process },
    { title: 'Заявки в работе', value: managerStats.progress }
  ]

  const handleSpecProjectCreate = () => {
    setProjectToEdit(undefined)
  }

  const handleSubmitProject = (data: IProject) => {
    const finalData = mapProjectToCreateData(data)
    createSpecProject(finalData)
  }

  const handleBoxCreate = () => {
    setModal('create')
  }

  const { hasAccess } = usePermissions()

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-h2">Главная страница</h2>

      <div className="flex gap-[20px] items-end">
        {stats.map((stat, index) => (
          <div key={stat.title} className="flex flex-col flex-1">
            <span className="text-h5 mb-[8px] text-text-grey-dark">{stat.title}</span>

            <div
              className={`
                h-[92px] rounded-[8px] ${index === 1 ? 'bg-white border border-grey-light' : 'bg-yellow-light'}
                flex items-center justify-center text-indicator-st
              `}
            >
              {stat.value}
            </div>
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
              <span className="text-h3 font-bold">{managerStats.progress}</span>
            </div>

            <div className="flex flex-col justify-center items-center min-w-[100px] gap-[4px] max-w-[185px] text-text-grey-dark ">
              <span className="text-h5 ">Обработаны: </span>
              <span className="text-h3 font-bold">{managerStats.process}</span>
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
          <DataTable idKey="id" data={visibleData} columns={headerTableData} />
        </div>
        {visibleCount < filteredData.length && (
          <div className="flex justify-end mt-[10px]">
            <button
              onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
              className="text-h5 text-grey-dark underline"
            >
              Показать больше
            </button>
          </div>
        )}
      </div>

      <ManageBoxModal isOpen={!!modal} onClose={() => setModal(null)} boxId={null} queryKey={BOX_SOLUTIONS_KEYS.all} />
      <SpecialProjectModal
        key={'new_edit'}
        isOpen={projectToEdit !== null}
        onClose={() => setProjectToEdit(null)}
        onSubmit={data => {
          setProjectToEdit(null)
          handleSubmitProject(data)
        }}
        modalTitle={'Создать спецпроект'}
        initialData={undefined}
      />
    </div>
  )
}
export const Component = Home
