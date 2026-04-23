import { Button, DataTable, DeleteModal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs } from '@/components/ui/Tabs'
import { useTabs } from '@/components/ui/Tabs/hooks/useTabs'
import type { TApplicationStatus } from '@/types/applications'
import { useState } from 'react'
import { changeBookingStatus } from './api/box/changeBoxStatus'
import { deleteBoxById } from './api/box/deleteBoxById'
import { changeSpecialProjectStatus } from './api/specialProject/changeSpecialProjectStatus'
import { deleteSpecialProjectById } from './api/specialProject/deleteSpecialProjectById'
import { type BoxListItemType, type ModalStateType, type SpecialProjectListItemType } from './applications.types'
import { TABS } from './configs/pageTabs.config'
import { dataTableColumns } from './configs/tableColumns.config'
import { useApplications } from './hooks/useApplications'
import { useDownload } from './hooks/useDownload'
import { Actions } from './ui/Actions'
import { BoxModal } from './ui/BoxModal'
import { QueryFilters } from './ui/QueryFilters'
import { SpecialProjectModal } from './ui/SpecialProjectModal'

const Applications = () => {
  const [modal, setModal] = useState<ModalStateType | null>(null)
  const [itemToDelete, setItemToDelete] = useState<string | number | null>(null)
  const { start } = useDownload()
  const { activeTab, onTabClick } = useTabs(TABS)
  const { boxes, projects, boxesQueryKey, specialProjectsQueryKey, isError } = useApplications(activeTab)

  const handleRowClick = (data: SpecialProjectListItemType | BoxListItemType) => {
    setModal({ id: String(data.id), type: activeTab })
  }

  const handleModify = async (id: string, status: TApplicationStatus) => {
    switch (activeTab) {
      case 'box':
        await changeBookingStatus(id, { status })
        break
      case 'specialProject':
        await changeSpecialProjectStatus(id, { status })
        break
    }
  }

  const isShowBoxDetails = modal?.type === 'box'
  const isShowSpecialProjectDetails = modal?.type === 'specialProject'
  const isBoxTab = activeTab === 'box'
  const currentQueryKey = isBoxTab ? boxesQueryKey : specialProjectsQueryKey
  const currentDeleteFn = isBoxTab ? deleteBoxById : deleteSpecialProjectById

  if (isError) return <div className="text-text">Ошибка при получении данных</div>

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <h1 className=" text-text-black-dark text-h2">Заявки</h1>
        <Tabs activeTab={activeTab} onTabClick={onTabClick} tabs={TABS} className="w-full" />
        <div className="flex justify-between mt-4 h-11">
          <QueryFilters key={activeTab} />
          <Button size={'default'} className="text-text p-5 w-43 self-end" onClick={() => {}}>
            Экспорт XLSX
          </Button>
        </div>
      </Card>
      <Card>
        {isBoxTab ? (
          <DataTable
            idKey={'id'}
            data={boxes.data?.items ?? []}
            columns={dataTableColumns[activeTab]}
            enableCheckboxes
            rowActions={Actions({ onDelete: setItemToDelete, onDownload: start })}
            isLoading={boxes.isLoading}
            onRowClick={handleRowClick}
            pagination={<Pagination pagination={boxes.data?.pagination} className="p-4 pt-0" />}
          />
        ) : (
          <DataTable
            idKey={'id'}
            data={projects.data?.items ?? []}
            columns={dataTableColumns[activeTab]}
            enableCheckboxes
            rowActions={Actions({ onDelete: setItemToDelete, onDownload: start })}
            isLoading={projects.isLoading}
            onRowClick={handleRowClick}
            pagination={<Pagination pagination={projects.data?.pagination} className="p-4 pt-0" />}
          />
        )}
      </Card>
      {isShowBoxDetails && (
        <BoxModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onDelete={id => deleteBoxById(String(id))}
          onModify={handleModify}
          id={modal.id}
          queryKey={[boxesQueryKey]}
          activeTab={modal.type}
        />
      )}
      {isShowSpecialProjectDetails && (
        <SpecialProjectModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onDelete={id => deleteSpecialProjectById(String(id))}
          onModify={handleModify}
          id={modal.id}
          queryKey={[specialProjectsQueryKey]}
          activeTab={modal.type}
        />
      )}
      <DeleteModal
        title="Удалить заявку?"
        isOpen={!!itemToDelete || itemToDelete === 0}
        onDelete={id => currentDeleteFn(String(id))}
        onClose={() => setItemToDelete(null)}
        itemId={itemToDelete}
        queryKey={[currentQueryKey]}
      >
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </div>
  )
}

export const Component = Applications
