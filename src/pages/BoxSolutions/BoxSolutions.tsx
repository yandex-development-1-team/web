import { BoxDetailsModal } from '@/components/BoxDetailsModal/BoxDetailsModal'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { BoxButton, DeleteModal } from '@/components/ui'
import { Pagination } from '@/components/ui/Pagination'
import { useState } from 'react'
import { deleteBoxById } from './api/deleteBoxById'
import { getBoxById } from './api/getBoxById'
import type { ModalState } from './BoxSolutions.types'
import { useBoxes } from './hooks/useBoxes'
import { Boxes } from './ui/Boxes'
import { usePermissions, PERMISSIONS } from '@/hooks/usePermissions'

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalState>()
  const { boxes, pagination, isError, isLoading, isPending, queryKey } = useBoxes()

  const { hasAccess } = usePermissions()

  if (isError) return <div className="text-text">Ошибка при получении данных</div>
  if (!boxes?.length && !isPending) return <div className="text-text">Нет сохраненных коробок</div>

  return (
    <div className="min-w-180">
      <div className="flex justify-between h-18 mb-5">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
        {hasAccess(PERMISSIONS.boxesEdit) &&
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
        }
      </div>
      <Boxes
        boxesList={boxes}
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
