import { DataTable } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs } from '@/components/ui/Tabs'
import { useTabs } from '@/components/ui/Tabs/hooks/useTabs'
import type { TApplicationStatus } from '@/types/applications'
import { useState } from 'react'
import { changeBookingStatus } from './api/bookings/changeBookingStatus'
import { deleteBookingById } from './api/bookings/deleteBookingById'
import { type ApplicationListItemType, type BookingListItemType, type ModalStateType } from './applications.types'
import { TABS } from './configs/pageTabs.config'
import { appDataTableColumns, bookingDataTableColumns } from './configs/tableColumns.config'
import { useApplications } from './hooks/useApplications'
import { Actions } from './ui/Actions'
import { BookingModal } from './ui/BookingModal'
import { QueryFilters } from './ui/QueryFilters'
import { SpecialProjectModal } from './ui/SpecialProjectModal'

const Applications = () => {
  const [modal, setModal] = useState<ModalStateType | null>(null)

  // if (isError) return <div className="text-text">Ошибка при получении данных</div>

  const { activeTab, onTabClick } = useTabs(TABS)
  const { bookings, applications, bookingsQueryKey } = useApplications()

  // const { isOpen, open, close } = useModal()

  const isShowBookingDetails = modal?.type === 'bookings'
  const isShowApplicationDetails = modal?.type === 'applications'

  const handleRowClick = async (data: ApplicationListItemType | BookingListItemType) => {
    // open(data)
    setModal({ id: String(data.id), type: activeTab })
  }

  const handleDelete = async (id: string | number) => {
    console.log('Delete', id)
  }

  const handleModify = async (id: string | number, status: TApplicationStatus) => {
    console.log('Modify', id)
    await changeBookingStatus(String(id), { status })
  }

  const handleDownload = async (id: string | number) => {
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
            rowActions={Actions({ onDelete: handleDelete, onDownload: handleDownload })}
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
            rowActions={Actions({ onDelete: handleDelete, onDownload: handleDownload })}
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
          queryKey={bookingsQueryKey}
        />
      )}
      {isShowApplicationDetails && (
        <SpecialProjectModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onDelete={id => deleteBookingById(String(id))}
          onModify={handleModify}
          id={modal.id}
          // data={mockBoxApplicationData}
        />
      )}
    </div>
  )
}

export const Component = Applications
