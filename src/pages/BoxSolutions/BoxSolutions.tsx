import { ManageBoxModal, ViewBoxModal } from '@/components/BoxModals'
import { BoxButton, DeleteModal } from '@/components/ui'
import { Pagination } from '@/components/ui/Pagination'
import { useState } from 'react'
import { deleteBox } from './api/deleteBox'
import type { ModalStateType } from './BoxSolutions.types'
import { useBoxes } from './hooks/useBoxes'
import { Boxes } from './ui/Boxes'
import { QueryFilters } from './ui/QueryFilters'

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalStateType | null>(null)
  const { boxes, pagination, isError, isLoading, isPending, queryKey } = useBoxes()
  console.log({ modal })

  if (isError) return <div className="text-text">Ошибка при получении данных</div>

  const isShowDetails = modal?.type === 'details'
  const isShowSolutions = modal?.type === 'create' || modal?.type === 'edit'
  const isShowDelete = modal?.type === 'delete'

  return (
    <div className="flex flex-col gap-5 min-w-180">
      <div className="flex justify-between h-18">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
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
      </div>
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
