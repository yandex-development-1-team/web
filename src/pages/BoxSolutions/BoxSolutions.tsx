import { ManageBoxModal, ViewBoxModal } from '@/components/BoxModals'
import { BoxButton, DeleteModal } from '@/components/ui'
import { Pagination } from '@/components/ui/Pagination'
import { PERMISSIONS, usePermissions } from '@/hooks/usePermissions'
import { useState } from 'react'
import { deleteBox } from './api/deleteBox'
import type { ModalStateType } from './BoxSolutions.types'
import { useBoxes } from './hooks/useBoxes'
import { Boxes } from './ui/Boxes'
import { QueryFilters } from './ui/QueryFilters'

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalStateType | null>(null)
  const { boxes, pagination, isError, isLoading, isPending, queryKey } = useBoxes()
  const { hasAccess } = usePermissions()
  console.log({ modal })

  if (isError) return <div className="text-text">Ошибка при получении данных</div>

  const isShowDetails = modal?.type === 'details'
  const isShowSolutions = modal?.type === 'create' || modal?.type === 'edit'
  const isShowDelete = modal?.type === 'delete'

  // const filteredData = boxes?.filter(box => {
  //   const matchesStatus =
  //     !statusFilter ||
  //     statusFilter === 'all' ||
  //     (statusFilter === 'active' && box.is_active_in_bot) ||
  //     (statusFilter === 'disable' && !box.is_active_in_bot)
  //   const matchesLocation =
  //     !locationFilter ||
  //     locationFilter === 'all' ||
  //     box.location.toLowerCase().includes(locationFilter.toLocaleLowerCase())
  //   const matchesOraganization =
  //     !organizationFilter ||
  //     organizationFilter === 'all' ||
  //     box.organizer.toLocaleLowerCase().includes(organizationFilter.toLocaleLowerCase())
  //   const matchesSearch = box.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())

  //   return matchesStatus && matchesLocation && matchesOraganization && matchesSearch
  // })

  return (
    <div className="flex flex-col gap-5 min-w-180">
      <div className="flex justify-between h-18">
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
      {/* <div className="grid grid-cols-[32%_68%] place-items-end mb-5.5">
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
      </div> */}
      <QueryFilters className="min-h-max" />

      {!boxes?.length && !isPending ? (
        <div className="text-text">Коробочные решения не найдены</div>
      ) : (
        <Boxes
          boxList={boxes}
          isLoading={isLoading}
          onDelete={(id: string) => setModal({ type: 'delete', id })}
          onEdit={(id: string) => setModal({ type: 'edit', id })}
          onDetailsView={(id: string) => setModal({ type: 'details', id })}
          pagination={<Pagination pagination={pagination} />}
        />
      )}
      {isShowDelete && (
        <DeleteModal
          title="Удалить коробку!"
          isOpen={true}
          onDelete={() => deleteBox(modal?.id)}
          onClose={() => setModal(null)}
          itemId={modal?.id}
          queryKey={queryKey}
        >
          Вы действительно хотите удалить эту коробку?
        </DeleteModal>
      )}
      {isShowSolutions && (
        <ManageBoxModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onSave={() => {}}
          boxId={modal?.id}
          queryKey={queryKey}
        />
      )}
      {isShowDetails && <ViewBoxModal boxId={modal.id} isOpen={true} onClose={() => setModal(null)} />}
    </div>
  )
}

export const Component = BoxSolutions
