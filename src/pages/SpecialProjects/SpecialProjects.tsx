import { useEffect, useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BoxButton, Input, Dropzone, DeleteModal } from '@/components/ui'
import { mockUrl } from '@/mockData/mockSpecialProjectsPageData'
import { EnvelopeIcon } from '@/assets/icons'
import { ProjectCard } from '@/components/layout/ProjectCard'
import { Pagination } from '@/components/ui/Pagination'
import { type IProject } from '@/types/solutions'
import { useMainWidth } from '@/hooks/useMainWidth'
import { SpecialProjectModal } from '@/components/SpecialProjectModal/SpecialProjectModal'
import { usePermissions, PERMISSIONS } from '@/hooks/usePermissions'
import { useSpecialProjects } from './hooks/useSpecialProjects'
import { filterSchema } from './specialProjects.types'
import { useQueryParams } from '@/hooks/useUrlFilters'
import { FiltersBlock } from './ui/FiltersBlock'
import { deleteSpecProject } from './api/deleteSpecialProject'
import { mapProjectToCreateData, mapProjectToEditData } from './api/specProject.mappers'
import { useUpdateSpecialProject } from './hooks/useUpdateSpecialProject'
import { useCreateSpecialProject } from './hooks/useCreateSpecialProject'

const SpecialProjects = () => {
  const { mutate: editSpecProject } = useUpdateSpecialProject()
  const { mutate: createSpecProject } = useCreateSpecialProject()
  const { data } = useSpecialProjects()

  const { updateParam } = useQueryParams(filterSchema)

  const cardMinWidth = 284
  const cardMaxWidth = 344

  const mainWidth = useMainWidth()
  const pageSize = Math.floor((mainWidth - 20) / (cardMinWidth + 20)) || 1

  const [searchParams] = useSearchParams()
  const offset = Number(searchParams.get('offset')) || 0

  const projects = data?.items || []
  const total = data?.pagination.total || 0

  const pageSizeLow = Math.floor((mainWidth - 20) / (cardMaxWidth + 20)) || 1
  const cardsOnCurrentPageCount = projects.slice(offset, offset + pageSize).length
  const justifyClass = cardsOnCurrentPageCount < pageSizeLow ? 'justify-start' : 'justify-between'

  const [url, setUrl] = useState(mockUrl)
  const [presentationFile, setPresentationFile] = useState<File | null>(null)

  const [projectToDelete, setProjectToDelete] = useState<number | string | null>(null)
  const [projectToEdit, setProjectToEdit] = useState<IProject | null | undefined>(null)
  const [projectToView, setProjectToView] = useState<IProject | null>(null)

  const [urlError, setUrlError] = useState(false)

  const handleFileAccept = (file: File) => {
    setPresentationFile(file)
  }

  const updateUrl = () => void url

  const handleUrlInput = () => {
    validateUrl()
    if (!urlError) {
      updateUrl()
    }
  }

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  const validateUrl = () => {
    const isSimpleUrl = url.includes('.') && !url.startsWith('.') && !url.endsWith('.')
    if (!isSimpleUrl) {
      setUrlError(true)
      return
    }
    const finalUrl = url.includes('://') ? url : `https://${url}`
    if (isValidUrl(finalUrl)) {
      setUrl(finalUrl)
      setUrlError(false)
    } else {
      setUrlError(true)
    }
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

  const handleProjectCreate = () => {
    setProjectToEdit(undefined)
  }

  const handleProjectView = (id: number | string) => {
    setProjectToView(projects.find(project => project.id === id) || null)
  }

  const handleProjectEdit = (id: number | string) => {
    setProjectToEdit(projects.find(project => project.id === id) || null)
  }

  const handleProjectDelete = (id: number | string) => {
    setProjectToDelete(id)
  }

  const { hasAccess } = usePermissions()

  const handleSubmitProject = (data: IProject) => {
    if (projectToEdit) {
      const finalData = mapProjectToEditData(data)
      editSpecProject(finalData)
    } else {
      const finalData = mapProjectToCreateData(data)
      createSpecProject(finalData)
    }
  }

  useEffect(() => {
    updateParam('limit')(String(pageSize))
  }, [pageSize])

  return (
    <>
      <h2 className="text-h2 text-text py-[38px_38px]">Управление спецпроектами</h2>
      <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-[10px_19px] text-text py-[19px_59px] relative">
        <h3 className="order-1 text-h3">Яндекс-форма для заявок</h3>
        <div className="relative order-3">
          <Input
            placeholder="URL"
            type="url"
            className={`
              text-h5 text-text bg-white text-center pe-3 min-h-[145px] h-full
              transition-[border-color] duration-300 ease-in-out
            `}
            onKeyDown={handleUrlKeyPress}
            value={url}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            invalid={urlError}
          />
          {urlError && <p className="absolute mt-[3px] text-xxs text-text-error">Некорректный URL</p>}
        </div>

        {(hasAccess(PERMISSIONS.presentationsEdit) && <h3 className="order-2 text-h3">Презентация</h3>) || (
          <div className="order-2" />
        )}
        {hasAccess(PERMISSIONS.presentationsEdit) && (
          <Dropzone
            className="order-4 flex flex-col items-center min-h-[145px] outline-0 px-2"
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
                <p className="text-h5 text-text mb-[2px] text-center">Переместите сюда нужный файл</p>
                <p className="text-small italic text-text-grey-dark mb-[14px] text-center">
                  Можно загрузить только один файл
                </p>
              </>
            )}
          </Dropzone>
        )}
      </div>

      <div className="flex justify-between mb-[20px]">
        <h3 className="text-h3 text-text">Список спецпроектов</h3>
        {hasAccess(PERMISSIONS.specprojectsEdit) && (
          <BoxButton
            className="text-button max-w-[340px] h-[72px] ml-[20px]"
            icon={'special_projects'}
            onClick={handleProjectCreate}
            variant={'filled'}
          >
            Создать спецпроект
          </BoxButton>
        )}
      </div>

      <FiltersBlock />

      <div
        className={`mt-[30px] flex gap-[20px] ${justifyClass}`}
        style={{ gridTemplateColumns: `repeat(${pageSize}, minmax(0, 1fr))` }}
      >
        {projects.map(project => (
          <ProjectCard
            style={{ minWidth: `${cardMinWidth}px`, maxWidth: `${cardMaxWidth}px` }}
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            isActive={project.isActive}
            onClick={() => handleProjectView(project.id)}
            onDelete={hasAccess(PERMISSIONS.specprojectsDelete) ? () => handleProjectDelete(project.id) : undefined}
            onEdit={hasAccess(PERMISSIONS.specprojectsEdit) ? () => handleProjectEdit(project.id) : undefined}
          />
        ))}
      </div>

      <Pagination
        className="mt-[26px]"
        variant="nav"
        pagination={{
          limit: pageSize,
          offset: offset,
          total: total
        }}
      />

      <SpecialProjectModal
        isOpen={projectToView !== null}
        onClose={() => setProjectToView(null)}
        onSubmit={() => setProjectToView(null)}
        modalTitle={'Спецпроект'}
        initialData={projectToView || undefined}
        viewOnly={true}
      />

      <SpecialProjectModal
        isOpen={projectToEdit !== null}
        onClose={() => setProjectToEdit(null)}
        onSubmit={data => {
          setProjectToEdit(null)

          handleSubmitProject(data)
        }}
        modalTitle={projectToEdit !== undefined ? 'Редактировать спецпроект' : 'Создать спецпроект'}
        initialData={projectToEdit || undefined}
      />

      <DeleteModal
        title="Удалить спецпроект?"
        isOpen={!!projectToDelete || projectToDelete === 0}
        onDelete={async id => {
          deleteSpecProject(Number(id))
        }}
        onClose={() => setProjectToDelete(null)}
        itemId={projectToDelete}
        queryKey={['specialProjects']}
      >
        <p>Вы действительно хотите удалить этот спецпроект?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </>
  )
}

export const Component = SpecialProjects
