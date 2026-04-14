import { useState } from 'react'
import { BoxButton, DeleteModal } from '@/components/ui'
import { ManageButton } from './ui/ManageButton'
import { BoxSolutionModal } from '@/components/BoxSolutionModal'
import { useModal } from '@/components/ui/Modal/useModal'
import { type ModalAction } from '@/components/BoxSolutionModal/BoxSolutionModal.type'
import {
  mockBoxes as initialMockBoxes,
  mockIndicatorsValues,
  mockProjects
} from '@/mockData/mockManageSolutionsPageData'
import type { BoxData } from '@/types/solutions'
import { indicators } from './solutionsData'
import type { IProject } from '@/types/solutions'
import { ProjectModal } from '@/pages/SpecialProjects/components'

const ManageSolutions = () => {
  const [boxes, setBoxes] = useState(initialMockBoxes)
  const [modalAction, setModalAction] = useState<ModalAction>('create')
  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null)
  const [deleteBoxId, setDeleteBoxId] = useState<number | null>(null)

  const { isOpen: isCreateEditBoxModalOpen, open: openCreateEditBoxModal, close: closeCreateEditBoxModal } = useModal()
  const { isOpen: isDeleteBoxModalOpen, open: openDeleteBoxModal, close: closeDeleteBoxModal } = useModal()

  const [projects, setProjects] = useState<IProject[]>(mockProjects)
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null)
  const [projectToEdit, setProjectToEdit] = useState<IProject | null | undefined>(null)

  const selectedBox = boxes.find(b => b.id === selectedBoxId)

  const handleBoxCreate = () => {
    setModalAction('create')
    setSelectedBoxId(null)
    openCreateEditBoxModal()
  }

  const handleBoxEdit = (id: number) => {
    setModalAction('edit')
    setSelectedBoxId(id)
    openCreateEditBoxModal()
  }

  const handleBoxSave = (data: Partial<Omit<BoxData, 'id'>>) => {
    if (modalAction === 'create') {
      const newBox: BoxData = {
        id: Math.max(...boxes.map(b => b.id), 0) + 1,
        ...(data as Omit<BoxData, 'id'>)
      }

      setBoxes(prev => [...prev, newBox])
    } else if (modalAction === 'edit' && selectedBox) {
      const updatedBox = { ...selectedBox, ...data }

      setBoxes(prev => prev.map(box => (box.id === selectedBox.id ? updatedBox : box)))
    }

    closeCreateEditBoxModal()
  }

  const handleBoxDeleteClick = (id: number) => {
    setDeleteBoxId(id)
    openDeleteBoxModal()
  }

  const handleBoxDeleteConfirm = async (id: string | number) => {
    setBoxes(prev => prev.filter(box => box.id !== id))
  }

  const deleteProject = async (id: string | number) => {
    setProjects(prev => prev.filter(project => project.id !== id))
  }

  const handleProjectCreate = () => {
    setProjectToEdit(undefined)
  }

  const handleProjectEdit = (id: number) => {
    setProjectToEdit(mockProjects.find(project => project.id === id) || null)
  }

  const handleProjectDelete = (id: number) => {
    setProjectToDelete(id)
  }

  return (
    <>
      <div
        className={`
          flex flex-col overflow-hidden h-[max(calc(100vh-40px),1016px)] min-[1115px]:h-[max(calc(100vh-40px),968px)]
        `}
      >
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

        <div
          className={`
            bg-white rounded-[8px] h-full py-[19px_20px] px-[15px] mt-[20px] flex-1 text-text
            flex flex-col min-h-0
          `}
        >
          <h4 className="text-h4sb text-text-black-dark pb-[18px] ml-[5px]">Список коробок и спецпроектов</h4>
          <div className="flex-1 min-h-0 grid grid-cols-2 gap-[10px]">
            <div className="flex-1 min-h-0 flex flex-col gap-[20px] ml-[5px]">
              <BoxButton className="button-text max-w-[calc(100%-5px)]" icon={'box'} onClick={handleBoxCreate}>
                Создать коробку
              </BoxButton>
              <div className="flex-1 flex flex-col gap-[20px] overflow-y-auto">
                {boxes.map(box => (
                  <ManageButton
                    key={box.id}
                    text={box.name}
                    onClick={() => handleBoxEdit(box.id)}
                    onDelete={() => handleBoxDeleteClick(box.id)}
                    className="max-w-[calc(100%-5px)]"
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-[20px] ml-[5px]">
              <BoxButton
                className="button-text max-w-[calc(100%-5px)]"
                icon={'special_projects'}
                smallIcon
                onClick={handleProjectCreate}
              >
                Создать спецпроект
              </BoxButton>
              <div className="flex-1 flex flex-col gap-[20px] overflow-y-auto">
                {projects.map(project => (
                  <ManageButton
                    key={project.id}
                    text={project.title}
                    onClick={() => handleProjectEdit(project.id)}
                    onDelete={() => handleProjectDelete(project.id)}
                    className="max-w-[calc(100%-5px)]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateEditBoxModalOpen && (
        <BoxSolutionModal
          key={selectedBox?.id ?? 'create'}
          isOpen={isCreateEditBoxModalOpen}
          onClose={closeCreateEditBoxModal}
          boxData={selectedBox}
          onSave={handleBoxSave}
        />
      )}

      <ProjectModal
        isOpen={projectToEdit !== null}
        onClose={() => setProjectToEdit(null)}
        project={projectToEdit || undefined}
      />

      <DeleteModal
        isOpen={isDeleteBoxModalOpen}
        onClose={closeDeleteBoxModal}
        itemId={deleteBoxId}
        onDelete={handleBoxDeleteConfirm}
        title="Удалить коробку?"
      >
        Вы действительно хотите удалить эту коробку? Действие нельзя отменить.
      </DeleteModal>

      <DeleteModal
        title="Удалить спецпроект?"
        isOpen={!!projectToDelete || projectToDelete === 0}
        onDelete={async id => {
          deleteProject(id)
        }}
        onClose={() => setProjectToDelete(null)}
        itemId={projectToDelete}
      >
        <p>Вы действительно хотите удалить этот спецпроект?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </>
  )
}

export const Component = ManageSolutions
