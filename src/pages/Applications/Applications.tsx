import { useSearchParams } from 'react-router-dom'
import { Button, DataTable, DeleteModal, LabelInDevelopment } from '@/components/ui'
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
  const [searchParams, setSearchParams] = useSearchParams()
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

  const handleDeleteSuccess = () => {
    const currentData = isBoxTab ? boxes.data : projects.data
    if (!currentData) return
    const { items, pagination } = currentData
    const { offset, limit } = pagination
    if (items.length === 1 && offset > 0) {
      const newParams = new URLSearchParams(searchParams)
      const newOffset = Math.max(0, offset - limit)
      newParams.set('offset', String(newOffset))
      setSearchParams(newParams)
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
          <div className="relative self-end h-11">
            <Button size={'default'} className="text-text p-2 w-43" onClick={() => {}}>
              Экспорт XLSX
            </Button>
            <LabelInDevelopment />
          </div>
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
            pagination={<Pagination pagination={boxes.data?.pagination} className="p-3 pt-2" />}
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
            pagination={<Pagination pagination={projects.data?.pagination} className="p-3 pt-2" />}
          />
        )}
      </Card>
      <BoxModal
        isOpen={isShowBoxDetails}
        onClose={() => setModal(null)}
        onDelete={async id => {
          await deleteBoxById(String(id))
          setModal(null)
          handleDeleteSuccess()
        }}
        onModify={handleModify}
        id={modal?.id ?? ''}
        queryKey={[boxesQueryKey]}
        activeTab={modal?.type || 'box'}
      />
      <SpecialProjectModal
        isOpen={isShowSpecialProjectDetails}
        onClose={() => setModal(null)}
        onDelete={async id => {
          await deleteSpecialProjectById(String(id))
          setModal(null)
          handleDeleteSuccess()
        }}
        onModify={handleModify}
        id={modal?.id ?? ''}
        queryKey={[specialProjectsQueryKey]}
        activeTab={modal?.type || 'specialProject'}
      />
      <DeleteModal
        title="Удалить заявку?"
        isOpen={!!itemToDelete || itemToDelete === 0}
        onDelete={async id => {
          await currentDeleteFn(String(id))
          handleDeleteSuccess()
        }}
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
