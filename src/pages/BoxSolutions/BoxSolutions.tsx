import { BoxDetailsModal } from '@/components/BoxDetailsModal/BoxDetailsModal'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { BoxButton, DeleteModal, Input, Select } from '@/components/ui'
import { Pagination } from '@/components/ui/Pagination'
import { useState } from 'react'
import { deleteBoxById } from './api/deleteBoxById'
import { getBoxById } from './api/getBoxById'
import type { ModalState } from './BoxSolutions.types'
import { useBoxes } from './hooks/useBoxes'
import { Boxes } from './ui/Boxes'
import { SearchIcon } from '@/assets/icons'
import { usePermissions, PERMISSIONS } from '@/hooks/usePermissions'

const statusOption = [
  { value: 'active', label: 'Активен в боте' },
  { value: 'disable', label: 'Не активен в боте' }
]

const locationOption = [
  { value: 'Ленина', label: 'Ленина' },
  { value: 'Мира', label: 'Мира' },
  { value: 'Советская', label: 'Советская' },
  { value: 'Гагарина', label: 'Гагарина' },
  { value: 'Лесная', label: 'Лесная' },
  { value: 'Полевая', label: 'Полевая' },
  { value: 'Новая', label: 'Новая' },
  { value: 'Садовая', label: 'Садовая' }
]

const organizationOption = [{ value: 'Secret Events Team', label: 'Secret Events Team' }]

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalState>()
  const { boxes, pagination, isError, isLoading, isPending, queryKey } = useBoxes()
  const [statusFilter, setStatusFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [organizationFilter, setOrganizationFilter] = useState('')
  const [search, setSearch] = useState('')

  const { hasAccess } = usePermissions()

  if (isError) return <div className="text-text">Ошибка при получении данных</div>
  if (!boxes?.length && !isPending) return <div className="text-text">Нет сохраненных коробок</div>

  const filteredData = boxes?.filter(box => {
    const matchesStatus =
      !statusFilter ||
      statusFilter === 'all' ||
      (statusFilter === 'active' && box.is_active_in_bot) ||
      (statusFilter === 'disable' && !box.is_active_in_bot)
    const matchesLocation =
      !locationFilter ||
      locationFilter === 'all' ||
      box.location.toLowerCase().includes(locationFilter.toLocaleLowerCase())
    const matchesOraganization =
      !organizationFilter ||
      organizationFilter === 'all' ||
      box.organizer.toLocaleLowerCase().includes(organizationFilter.toLocaleLowerCase())
    const matchesSearch = box.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())

    return matchesStatus && matchesLocation && matchesOraganization && matchesSearch
  })

  return (
    <div className="min-w-180">
      <div className="flex justify-between h-18 mb-4">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
        {hasAccess(PERMISSIONS.boxesCreate) && (
          <BoxButton
            size={'small'}
            icon="box"
            className="text-text p-5 w-85"
            onClick={() => {
              setModal({ type: 'create', id: null })
            }}
          >
            Создать коробку
          </BoxButton>
        )}
      </div>
      <div className="grid grid-cols-[32%_68%] place-items-end mb-5.5">
        <Input
          variant="icon"
          icon={<SearchIcon className="size-4.5" />}
          onChange={e => setSearch(e.target.value)}
          className="h-[44px] min-w-[344px] py-[14px] w-full pl-[12px] rounded-[8px] [&_[data-slot='input-group-addon']]:px-2 [&_[data-slot='input-group-addon']]:py-2 bg-system-background"
          placeholder=""
        />
        <div className="flex flex-row gap-2.5">
          <div>
            <span className="text-xxs text-text-grey-light">Статус</span>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={statusOption}
              placeholder="Выберите статус"
              classNames={{
                trigger:
                  'text-[16px] px-[6px] py-[5px] border border-grey-light rounded-[8px] pl-[12px] md:min-w-[228px] bg-white data-[placeholder]:text-text-grey-light data-[placeholder]:text-[14px] data-[placeholder]:italic',
                content: 'border border-grey-light rounded-[8px] bg-white',
                item: 'px-[12px] py-[8px]'
              }}
            />
          </div>
          <div>
            <span className="text-xxs text-text-grey-light">Место проведения</span>
            <Select
              value={locationFilter}
              onValueChange={setLocationFilter}
              options={locationOption}
              placeholder="Выберите локацию"
              classNames={{
                trigger:
                  'text-[16px] px-[6px] py-[5px] border border-grey-light rounded-[8px] pl-[12px] md:min-w-[228px] bg-white data-[placeholder]:text-text-grey-light data-[placeholder]:text-[14px] data-[placeholder]:italic',
                content: 'border border-grey-light rounded-[8px] bg-white',
                item: 'px-[12px] py-[8px]'
              }}
            />
          </div>
          <div>
            <span className="text-xxs text-text-grey-light">Организатор</span>
            <Select
              value={organizationFilter}
              onValueChange={setOrganizationFilter}
              options={organizationOption}
              placeholder="Выберите организатора"
              classNames={{
                trigger:
                  'text-[16px] px-[6px] py-[5px] border border-grey-light rounded-[8px] pl-[12px] md:min-w-[228px] bg-white data-[placeholder]:text-text-grey-light data-[placeholder]:text-[14px] data-[placeholder]:italic',
                content: 'border border-grey-light rounded-[8px] bg-white',
                item: 'px-[12px] py-[8px]'
              }}
            />
          </div>
        </div>
      </div>
      <Boxes
        boxesList={filteredData}
        isLoading={isLoading}
        onDelete={hasAccess(PERMISSIONS.boxesDelete) ? (id: string) => setModal({ type: 'delete', id }) : undefined}
        onEdit={hasAccess(PERMISSIONS.boxesEdit) ? (id: string) => setModal({ type: 'edit', id }) : undefined}
        onDetailsView={(id: string) => setModal({ type: 'details', id })}
        pagination={<Pagination pagination={pagination} />}
      />
      <DeleteModal
        title="Удалить коробку!"
        isOpen={modal?.type === 'delete'}
        onDelete={() => deleteBoxById(modal?.id ?? '')}
        onClose={() => setModal(null)}
        itemId={Number(modal?.id)}
        queryKey={queryKey}
      >
        Вы действительно хотите удалить эту коробку?
      </DeleteModal>
      <BoxSolutionModal
        key={modal?.id}
        isOpen={modal?.type === 'create' || modal?.type === 'edit'}
        onClose={() => setModal(null)}
        onSave={() => {}}
        boxData={modal?.id ? getBoxById(String(modal?.id)) : undefined}
      />
      <BoxDetailsModal
        boxId={modal?.id ?? ''}
        isOpen={modal?.type === 'details'}
        onClose={() => setModal(null)}
        onFetchBox={getBoxById}
      />
    </div>
  )
}

export const Component = BoxSolutions
