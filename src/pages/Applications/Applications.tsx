import { DataTable, DeleteModal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs } from '@/components/ui/Tabs'
import { useTabs } from '@/components/ui/Tabs/hooks/useTabs'
import type { TApplicationStatus } from '@/types/applications'
import { useState } from 'react'
import { deleteApplicationItemById } from './api/applications/deleteApplicatiopnById'
import { changeBookingStatus } from './api/bookings/changeBookingStatus'
import { deleteBookingById } from './api/bookings/deleteBookingById'
import { type ApplicationListItemType, type BookingListItemType, type ModalStateType } from './applications.types'
import { TABS } from './configs/pageTabs.config'
import { appDataTableColumns, bookingDataTableColumns } from './configs/tableColumns.config'
import { useApplications } from './hooks/useApplications'
import { useDownload } from './hooks/useDownload'
import { Actions } from './ui/Actions'
import { BookingModal } from './ui/BookingModal'
import { QueryFilters } from './ui/QueryFilters'
import { SpecialProjectModal } from './ui/SpecialProjectModal'

const Applications = () => {
  const [modal, setModal] = useState<ModalStateType | null>(null)
  const [itemToDelete, setItemToDelete] = useState<string | number | null>(null)
  // const [itemToDownload, setItemToDownload] = useState<string>('')
  // if (isError) return <div className="text-text">Ошибка при получении данных</div>
  const { start } = useDownload()
  const { activeTab, onTabClick } = useTabs(TABS)
  const { bookings, applications, bookingsQueryKey, applicationsQueryKey } = useApplications()

  // const { isOpen, open, close } = useModal()

  const isShowBookingDetails = modal?.type === 'bookings'
  const isShowApplicationDetails = modal?.type === 'applications'

  const handleRowClick = async (data: ApplicationListItemType | BookingListItemType) => {
    // open(data)
    setModal({ id: String(data.id), type: activeTab })
  }

  const handleBookingDelete = async (id: string | number) => {
    console.log('Delete Booking', id)
    await deleteBookingById(String(id))
  }
  void handleBookingDelete //TODO:remove

  const handleApplicationDelete = async (id: string | number) => {
    console.log('Delete Application', id)
    await deleteApplicationItemById(String(id))
  }

  const handleModify = async (id: string | number, status: TApplicationStatus) => {
    console.log('Modify', id)
    await changeBookingStatus(String(id), { status })
  }

  const handleDownload = async (id: string | number) => {
    // setItemToDownload(String(id))
    start(String(id))
    console.log('Download', id)
  }

  const dataTableColumns = {
    bookings: bookingDataTableColumns,
    applications: appDataTableColumns
  }

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <h1 className=" text-text-black-dark text-h2">Заявки</h1>
        <Tabs activeTab={activeTab} onTabClick={onTabClick} tabs={TABS} className="w-full" />
        {/* <Filters className="mt-4" /> */}
        <QueryFilters className="mt-4" />
      </Card>
      <Card>
        {activeTab === 'bookings' ? (
          <DataTable
            idKey={'id'}
            data={bookings.data?.items ?? []}
            columns={dataTableColumns[activeTab]}
            enableCheckboxes
            rowActions={Actions({ onDelete: setItemToDelete, onDownload: start })}
            isLoading={bookings.isLoading}
            onRowClick={handleRowClick}
            pagination={<Pagination pagination={bookings.data?.pagination} className="p-4 pt-0" />}
          />
        ) : (
          <DataTable
            idKey={'id'}
            data={applications.data?.items ?? []}
            columns={dataTableColumns[activeTab]}
            enableCheckboxes
            rowActions={Actions({ onDelete: handleApplicationDelete, onDownload: handleDownload })}
            isLoading={applications.isLoading}
            onRowClick={handleRowClick}
            pagination={<Pagination pagination={applications.data?.pagination} className="p-4 pt-0" />}
          />
        )}
      </Card>
      {isShowBookingDetails && (
        <BookingModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onDelete={id => deleteBookingById(String(id))}
          onModify={handleModify}
          id={modal.id}
          queryKey={[bookingsQueryKey]}
        />
      )}
      {isShowApplicationDetails && (
        <SpecialProjectModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onDelete={id => deleteApplicationItemById(String(id))}
          onModify={handleModify}
          id={modal.id}
          queryKey={[applicationsQueryKey]}
        />
      )}
      <DeleteModal
        title="Удалить заявку?"
        isOpen={!!itemToDelete || itemToDelete === 0}
        onDelete={id => deleteBookingById(String(id))}
        onClose={() => {
          // setBoxApplicationToDelete(null)
          setItemToDelete(null)
        }}
        itemId={itemToDelete}
        queryKey={[bookingsQueryKey]}
      >
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </div>
  )
}

export const Component = Applications
