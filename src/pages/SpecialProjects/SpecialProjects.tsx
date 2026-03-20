import { useState, type ChangeEvent } from 'react'
import { BoxButton, Input, Dropzone, DeleteModal } from '@/components/ui'
import { mockProjects } from '@/mockData/mockSpecialProjectsPageData'
import { EnvelopeIcon } from '@/assets/icons'
import { ProjectCard } from '@/components/layout/ProjectCard'
import { TableControls } from '@/components/ui/DataTable/ui/TableControls'
import { type IProject } from '@/types/solutions'

const SpecialProjects = () => {
  const pageSize = 3
  const [page, setPage] = useState(1)

  const [projects, setProjects] = useState<IProject[]>(mockProjects)

  const [url, setUrl] = useState('')
  const [presentationFile, setPresentationFile] = useState<File | null>(null)

  const [projectToDelete, setProjectToDelete] = useState<number | null>(null)

  const handleFileAccept = (file: File) => {
    setPresentationFile(file)
  }

  const handleUrlInput = () => {
    validateUrl()
  }

  const validateUrl = () => {
    const isSimpleUrl = url.includes('.') && !url.startsWith('.')
    if (!isSimpleUrl) {
      setUrl('')
      return
    }
    const finalUrl = url.includes('://') ? url : `https://${url}`
    setUrl(finalUrl)
  }

  const filterUrl = (url: string) => {
    return url.replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, '')
  }

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setUrl(filterUrl(e.target.value))
  }

  const handleUrlBlur = () => {
    handleUrlInput()
  }

  const handleUrlKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const deleteProject = async (id: string | number) => {
    setProjects(prev => prev.filter(project => project.id !== id))
  }

  const handleProjectCreate = () => {}

  const handleProjectEdit = (id: number) => void id

  const handleProjectDelete = (id: number) => {
    setProjectToDelete(id)
  }

  return (
    <>
      <h2 className="text-h2 text-text py-[38px_38px]">Управление спецпроектами</h2>
      <div className="grid grid-cols-2 gap-[19px] text-text py-[19px_59px]">
        <div>
          <h3 className="text-h3 pb-[10px]">Яндекс-форма для заявок</h3>
          <Input
            placeholder="URL"
            type="url"
            className={`
              h-[145px] text-h5 text-text bg-white text-center transition-[border-color] duration-300 ease-in-out
            `}
            onKeyDown={handleUrlKeyPress}
            value={url}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
          />
        </div>
        <div>
          <h3 className="text-h3 pb-[10px]">Презентация</h3>
          <Dropzone
            className="flex flex-col items-center h-[145px]"
            accept={{ 'application/pdf': ['.pdf'] }}
            onFileAccepted={handleFileAccept}
          >
            <div className="h-[48px] w-[48px] flex items-center justify-center my-[15px_19px]">
              <EnvelopeIcon className="text-text" />
            </div>
            {presentationFile ? (
              <p className="text-h5 text-text">{presentationFile.name}</p>
            ) : (
              <>
                <p className="text-h5 text-text mb-[2px]">Переместите сюда нужный файл</p>
                <p className="text-small italic text-text-grey-dark mb-[14px]">Можно загрузить только один файл</p>
              </>
            )}
          </Dropzone>
        </div>
      </div>

      <div className="flex justify-between mb-[20px]">
        <h3 className="text-h3 text-text">Список спецпроектов</h3>
        <BoxButton
          className="text-button max-w-[340px] h-[72px]"
          icon={'special_projects'}
          onClick={handleProjectCreate}
          variant={'filled'}
        >
          Создать спецпроект
        </BoxButton>
      </div>

      <div className="mt-[30px] flex gap-[20px] justify-between">
        {projects.slice((page - 1) * pageSize, page * pageSize).map(project => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            status={project.status}
            onClick={() => handleProjectEdit(project.id)}
            onDelete={() => handleProjectDelete(project.id)}
          />
        ))}
      </div>
      {projects.length > pageSize && (
        <div className="[&>*:first-child>*:first-child]:hidden flex justify-end mt-[26px] -mr-[16px] -mb-[16px]">
          <TableControls
            pageSize={pageSize}
            currentPage={page}
            totalItems={projects.length}
            onPageChange={page => setPage(page)}
            onPageSizeChange={() => {}}
          ></TableControls>
        </div>
      )}
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

export const Component = SpecialProjects
