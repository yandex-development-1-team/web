import { AddIcon, BoxIcon } from '@/assets/icons'
import { Pagination } from '@/components/Pagination/Pagination'
import { Button, DeleteModal } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import { useState } from 'react'
import { deleteBoxById } from './api/deleteBoxById'
import { useBoxes } from './hooks/useBoxes'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const [boxToDelete, setBoxToDelete] = useState<number | string>('')
  const [boxToEdit, setBoxToEdit] = useState<number | string>('')
  const { boxes, pagination, isError, isPending, queryKey } = useBoxes()

  if (isError) return <div className="text-text">Ошибка при получении данных</div>
  if (!boxes?.length && !isPending) return <div className="text-text">Нет сохраненных коробок</div>

  return (
    <div className="max-w-268">
      <div className="flex justify-between h-18 mb-5">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
        <Button variant={'default'} className="text-text p-5 w-85 ">
          <BoxIcon style={{ width: 'auto', height: '100%' }} />
          <p className="mr-auto">Создать коробку</p>
          <AddIcon style={{ width: 'auto', height: '100%' }} className="border border-white bg-white rounded-lg" />
        </Button>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
            {boxes?.map(box => {
              return (
                <Box
                  box={box}
                  key={box.id}
                  onDelete={() => setBoxToDelete(box.id)}
                  onEdit={() => setBoxToEdit(box.id)}
                />
              )
            })}
          </div>
          <Pagination pagination={pagination} />
        </div>
      )}
      <DeleteModal
        title="Удалить коробку!"
        isOpen={!!boxToDelete}
        onDelete={() => deleteBoxById(Number(boxToDelete))}
        onClose={() => setBoxToDelete(0)}
        itemId={boxToDelete}
        queryKey={queryKey}
      >
        <div>{'Вы действительно хотите удалить эту коробку?'}</div>
      </DeleteModal>
      {boxToEdit}
    </div>
  )
}

export const Component = BoxSolutions
