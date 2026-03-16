import { useState } from 'react'
import { BoxButton, DeleteModal } from '@/components/ui'
import { ManageButton } from './ui/ManageButton'
import { BoxSolutionModal } from '../../components/BoxSolutionModal'
import { useModal } from '@/components/ui/Modal/useModal'
import { type ModalAction } from '@/components/BoxSolutionModal/BoxSolutionModal.type'
import type { BoxData } from '@/types/solutions'
import { indicators } from './solutionsData'
import {
  mockIndicatorsValues,
  mockBoxes as initialMockBoxes,
  mockProjects
} from '@/mockData/mockManageSolutionsPageData'

const ManageSolutions = () => {
  const [boxes, setBoxes] = useState<BoxData[]>(initialMockBoxes)
  const [modalAction, setModalAction] = useState<ModalAction>('create')
  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null)
  const [deleteBoxId, setDeleteBoxId] = useState<number | null>(null)
  const { isOpen: isCreateEditModalOpen, open: openCreateEditModal, close: closeCreateEditModal } = useModal()
  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal } = useModal()

  const selectedBox = boxes.find(b => b.id === selectedBoxId)

  const handleBoxCreate = () => {
    setModalAction('create')
    setSelectedBoxId(null)
    openCreateEditModal()
  }

  const handleBoxEdit = (id: number) => {
    setModalAction('edit')
    setSelectedBoxId(id)
    openCreateEditModal()
  }

  const handleBoxSave = (data: Omit<BoxData, 'id'>) => {
    if (modalAction === 'create') {
      const newBox: BoxData = {
        id: Math.max(...boxes.map(b => b.id), 0) + 1,
        ...data
      }

      setBoxes(prev => [...prev, newBox])
    } else if (modalAction === 'edit' && selectedBox) {
      const updatedBox: BoxData = { ...selectedBox, ...data }

      setBoxes(prev => prev.map(box => (box.id === selectedBox.id ? updatedBox : box)))
    }

    closeCreateEditModal()
  }

  const handleBoxDeleteClick = (id: number) => {
    setDeleteBoxId(id)
    openDeleteModal()
  }

  const handleBoxDeleteConfirm = async (id: string | number) => {
    setBoxes(prev => prev.filter(box => box.id !== id))
  }

  const handleProjectCreate = () => {}

  const handleProjectEdit = (id: number) => void id

  const handleProjectDelete = (id: number) => void id

  return (
    <>
      <div className="bg-white text-text-black-dark px-[20px] pb-[20px] rounded-[8px]">
        <h2 className="text-h2 py-[18px_13px]">Управление коробками и спецпроектами</h2>
        <h4 className="text-h4sb pb-[14px]">Сводка дня</h4>
        <div className="flex text-text gap-[20px]">
          {indicators.map(indicator => (
            <div className="flex-1" key={indicator.id}>
              <p className="text-xxs pb-[7px]">{indicator.name}</p>
              <div
                className={`
                border-1 border-grey-light rounded-[8px] text-indicator text-center py-[30px]
                ${indicator.warningColor && 'text-text-error'}
              `}
              >
                {mockIndicatorsValues.find(el => el.id === indicator.id)?.value || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`bg-white rounded-[8px] h-full p-[20px] pt-[19px] mt-[20px] flex-1 text-text`}>
        <h4 className="text-h4sb text-text-black-dark pb-[18px]">Список коробок и спецпроектов</h4>
        <div className="grid grid-cols-2 gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <BoxButton className="button-text" icon={'box'} onClick={handleBoxCreate}>
              Создать коробку
            </BoxButton>
            {boxes.map(box => (
              <ManageButton
                key={box.id}
                text={box.name}
                onClick={() => handleBoxEdit(box.id)}
                onDelete={() => handleBoxDeleteClick(box.id)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-[20px]">
            <BoxButton className="button-text" icon={'special_projects'} onClick={handleProjectCreate}>
              Создать спецпроект
            </BoxButton>
            {mockProjects.map(project => (
              <ManageButton
                key={project.id}
                text={project.name}
                onClick={() => handleProjectEdit(project.id)}
                onDelete={() => handleProjectDelete(project.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <BoxSolutionModal
        key={`${modalAction}-${selectedBox?.id || 'new'}`}
        isOpen={isCreateEditModalOpen}
        onClose={closeCreateEditModal}
        action={modalAction}
        boxData={selectedBox}
        onSave={handleBoxSave}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        itemId={deleteBoxId}
        onDelete={handleBoxDeleteConfirm}
        title="Удалить коробку?"
      >
        Вы действительно хотите удалить эту коробку? Действие нельзя отменить.
      </DeleteModal>
    </>
  )
}

export const Component = ManageSolutions
