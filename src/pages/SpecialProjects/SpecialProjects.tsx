import { Link } from 'react-router-dom'
import { useState } from 'react'
import { EnvelopeIcon, SearchIcon } from '@/assets/icons'
import { BoxButton, DeleteModal, Dropzone, Input, Select } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { MOCK_DATA, MOCK_SPEC_PROJECTS_DATA } from '@/mockData/specProjects.mock'
import { ProjectCard } from './ui/ProjectCard'
import { useModal } from '@/components/ui/Modal/useModal'
import { SpecialProjectModal } from '@/components/SpecialProjectModal/SpecialProjectModal'
import { InfoBlock } from './ui/InfoBlock'

export function SpecialProjects() {
  const { isOpen: isOpenDeleteModal, open: openDeleteModal, close } = useModal()
  const { isOpen: isOpenCreateProject, close: onCloseCreateProject, open: onOpenProjectModal } = useModal()

  const [file, setFile] = useState<File | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleFileAccept = (fileItem: File) => {
    setFile(fileItem)
  }

  const handleDeletProject = (id: string | number) => {
    setDeletingId(Number(id))
    openDeleteModal()
  }

  const handleEditProject = (id: string | number) => {
    setEditingId(Number(id))
    onOpenProjectModal()
  }

  const handleCloseModal = () => {
    setEditingId(null)
    onCloseCreateProject()
  }

  return (
    <div className={cn('pt-5 flex flex-col gap-14')}>
      <h2 className="text-h2 text-black">Управление спецпроектами</h2>
      <div className="flex gap-3 max-[1200px]:flex-col">
        <InfoBlock title="Яндекс-форма для заявок" classNameContent="p-3">
          <Link to={MOCK_DATA.formLink} target="_blank" className="text-text text-h5">
            <span className="break-all">{MOCK_DATA.formLink}</span>
          </Link>
        </InfoBlock>
        <InfoBlock title="Презентация" classNameContent="border-0">
          <Dropzone
            accept={{ 'application/pdf': ['.pdf'] }}
            onFileAccepted={handleFileAccept}
            className="w-full h-full flex flex-col items-center pt-5 gap-5"
          >
            <EnvelopeIcon />
            <div>
              <p>Переместите сюда нужный файл</p>
              <p className="text-small italic text-text-grey-dark">
                {file ? file.name : 'Можно загрузить только один файл'}
              </p>
            </div>
          </Dropzone>
        </InfoBlock>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <h3 className="text-h3 text-text">Список спецпроектов</h3>
          <BoxButton
            className="text-button max-w-85 h-18 ml-5"
            icon={'special_projects'}
            variant={'filled'}
            onClick={() => onOpenProjectModal()}
          >
            Создать спецпроект
          </BoxButton>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-5 mb-6">
          <Input
            variant="icon"
            icon={<SearchIcon />}
            className="bg-white min-[1440px]:min-w-84 h-full"
            placeholder=""
          />
          <Select
            options={MOCK_DATA.selectData}
            placeholder="Выберите статус"
            classNames={{ trigger: 'bg-white w-full h-11.5' }}
          />
        </div>
        <div className="gap-5 grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))]">
          {MOCK_SPEC_PROJECTS_DATA.map(item => {
            return (
              <ProjectCard
                key={item.id}
                descriptioin={item.description ?? ''}
                status={item.is_active_in_bot}
                title={item.title}
                image={item.image}
                onDelete={() => handleDeletProject(item.id)}
                onEdit={() => handleEditProject(item.id)}
              />
            )
          })}
        </div>
      </div>

      <SpecialProjectModal
        modalTitle={editingId !== null ? 'Редактировать спецпроект' : 'Создать спецпроект'}
        onSubmit={data => {
          console.log(data)
          handleCloseModal()
        }}
        isOpen={isOpenCreateProject}
        onClose={handleCloseModal}
        initialData={editingId !== null ? MOCK_SPEC_PROJECTS_DATA.find(item => item.id === editingId) : undefined}
      />

      <DeleteModal
        title="Удалить спецпроект?"
        isOpen={isOpenDeleteModal}
        onDelete={async id => {
          handleDeletProject(id)
        }}
        onClose={close}
        itemId={deletingId}
      >
        <p>Вы действительно хотите удалить этот спецпроект?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </div>
  )
}

export const Component = SpecialProjects
