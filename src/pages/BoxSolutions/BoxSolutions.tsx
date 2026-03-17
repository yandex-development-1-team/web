import { Pagination } from '@/components/Pagination/Pagination'
import { BoxButton, DeleteModal } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import { useState } from 'react'
import { deleteBoxById } from './api/deleteBoxById'
import type { ModalState } from './BoxSolutions.types'
import { useBoxes } from './hooks/useBoxes'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalState>(null)
  const { boxes, pagination, isError, isLoading, isPending, queryKey } = useBoxes()

  if (isError) return <div className="text-text">{'Ошибка при получении данных'}</div>
  if (!boxes?.length && !isPending) return <div className="text-text">{'Нет сохраненных коробок'}</div>

  return (
    <div className="min-w-180">
      <div className="flex justify-between h-18 mb-5">
        <h1 className="text-h2 text-text">{'Коробочные решения'}</h1>
        <BoxButton
          size={'small'}
          icon="box"
          className="text-text p-5 w-85"
          onClick={() => {
            setModal({ type: 'create', id: null })
          }}
        >
          {'Создать коробку'}
        </BoxButton>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
            {boxes?.map(box => {
              return (
                <Box
                  box={box}
                  key={box.id}
                  onDelete={() => setModal({ type: 'delete', id: box.id })}
                  onEdit={() => setModal({ type: 'edit', id: box.id })}
                />
              )
            })}
          </div>
          <Pagination pagination={pagination} />
        </div>
      )}
      <DeleteModal
        title="Удалить коробку!"
        isOpen={modal?.type === 'delete'}
        onDelete={() => deleteBoxById(Number(modal?.id))}
        onClose={() => setModal(null)}
        itemId={Number(modal?.id)}
        queryKey={queryKey}
      >
        <div>{'Вы действительно хотите удалить эту коробку?'}</div>
      </DeleteModal>
      {modal?.type}
    </div>
  )
}

export const Component = BoxSolutions
