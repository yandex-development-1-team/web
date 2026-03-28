import { EditIcon, DeleteIcon, DownloadIcon } from '@/assets/icons'

import { Button } from '@/components/ui/Button'
import type { TScheduleTable } from './ScheduleTable.type'
import type { TTableEvent, TEvent } from '@/types/schedule.types'
import { useState } from 'react'
import { eventKeys, useUpdateEvent, useDeleteEvent } from '@/pages/Schedule/hooks/useEvents'
import { DataTable, DeleteModal } from '@/components/ui'
import { EditEventModal } from '@/pages/Schedule/ui'

export const ScheduleTable = (props: TScheduleTable) => {
  const { events, onSelect, optionColums, onLoadMore, hasMore, isLoadingMore } = props

  const [editItem, setEditItem] = useState<TEvent | null>(null)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const hendelEdit = (row: TTableEvent) => {
    const item = events.find(item => item.id === row.id)
    if (item) setEditItem(item)
    setIsOpenEdit(true)
  }
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeleteClick = (row: TTableEvent) => {
    setDeleteItemId(row.id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async (id: string | number) => {
    await deleteEvent.mutateAsync(id as number)
  }
  const updateEvent = useUpdateEvent()
  const deleteEvent = useDeleteEvent()

  const handleSaveEdit = async (updatedData: Partial<TEvent>) => {
    if (!editItem) return

    await updateEvent.mutateAsync({
      id: editItem.id,
      ...updatedData
    })
    setIsOpenEdit(false)
    setEditItem(null)
  }

  const renderRowActions = (row: TTableEvent) => (
    <div className="flex gap-2">
      <Button variant="ghost" className="size-11.5 border-grey-light" onClick={() => hendelEdit(row)}>
        <EditIcon className="size-6" color="var(--color-black)" />
      </Button>
      <Button variant="ghost" className="size-11.5 border-grey-light" onClick={() => handleDeleteClick(row)}>
        <DeleteIcon className="size-6" color="var(--color-black)" />
      </Button>
      <Button variant="ghost" className="size-11.5 border-grey-light" onClick={() => {}}>
        <DownloadIcon className="size-6" color="var(--color-black)" />
      </Button>
    </div>
  )

  const transformedData = events.map(event => ({
    ...event,
    time: event.time?.from || ''
  }))

  return (
    <div className="space-y-4">
      <DataTable
        columns={optionColums}
        data={transformedData}
        rowActions={renderRowActions}
        idKey="id"
        enableCheckboxes={true}
        onSelect={onSelect}
      />

      <div className="flex justify-end">
        {hasMore && (
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            variant="ghost"
            className="border border-transparent text-grey-dark underline!"
          >
            {isLoadingMore ? <>Загрузка...</> : 'Показать больше'}
          </Button>
        )}
      </div>
      {editItem && (
        <EditEventModal
          defaultValue={editItem}
          isOpen={isOpenEdit}
          onClose={() => {
            setIsOpenEdit(false)
            setEditItem(null)
          }}
          onSaveForm={handleSaveEdit}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeleteItemId(null)
        }}
        itemId={deleteItemId}
        onDelete={handleDelete}
        queryKey={eventKeys.lists()}
        title="Удалить событие?"
      >
        <p>Вы действительно хотите удалить это событие?</p>
      </DeleteModal>
    </div>
  )
}
