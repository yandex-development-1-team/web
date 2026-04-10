import { BoxDetailsModal } from '@/components/BoxDetailsModal/BoxDetailsModal'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { BoxButton, DeleteModal } from '@/components/ui'
import { Pagination } from '@/components/ui/Pagination'
import { useState } from 'react'
import { deleteBoxById } from './api/deleteBoxById'
import type { ModalState } from './BoxSolutions.types'
import { useBoxes } from './hooks/useBoxes'
import { Boxes } from './ui/Boxes'

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalState | null>(null)
  const { boxes, pagination, isError, isLoading, isPending, queryKey } = useBoxes()

  if (isError) return <div className="text-text">Ошибка при получении данных</div>
  if (!boxes?.length && !isPending) return <div className="text-text">Нет сохраненных коробок</div>

  const isShowDetails = modal?.type === 'details'
  const isShowSolutions = modal?.type === 'create' || modal?.type === 'edit'
  const isShowDelete = modal?.type === 'delete'

  return (
    <div className="min-w-180">
      <div className="flex justify-between h-18 mb-5">
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
      <Boxes
        boxesList={boxes}
        isLoading={isLoading}
        onDelete={(id: string) => setModal({ type: 'delete', id })}
        onEdit={(id: string) => setModal({ type: 'edit', id })}
        onDetailsView={(id: string) => setModal({ type: 'details', id })}
        pagination={<Pagination pagination={pagination} />}
      />
      {isShowDelete && (
        <DeleteModal
          title="Удалить коробку!"
          isOpen={true}
          onDelete={() => deleteBoxById(modal?.id ?? '')}
          onClose={() => setModal(null)}
          itemId={Number(modal?.id)}
          queryKey={queryKey}
        >
          Вы действительно хотите удалить эту коробку?
        </DeleteModal>
      )}
      {isShowSolutions && (
        <BoxSolutionModal
          key={modal.id}
          isOpen={true}
          onClose={() => setModal(null)}
          onSave={() => {}}
          boxId={modal?.id}
        />
      )}
      {isShowDetails && <BoxDetailsModal boxId={modal.id} isOpen={true} onClose={() => setModal(null)} />}
    </div>
  )
}

export const Component = BoxSolutions
