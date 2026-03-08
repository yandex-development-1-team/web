import { useRef } from 'react'
import { api } from '@/app/providers/axios'
import { Modal } from '@/components/ui/Modal'
import { ProjectForm, type ProjectFormValues } from './ProjectForm'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project?: ProjectFormValues & { id?: string | number }
  isPending?: boolean
}

export const ProjectModal = ({ isOpen, onClose, project, isPending = false }: ProjectModalProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (data: ProjectFormValues) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('isActive', String(data.isActive))

    if (data.image instanceof File) {
      formData.append('image', data.image)
    }

    try {
      if (project?.id) {
        await api.put(`/special-projects/${project.id}`, formData)
        toast.success('Спецпроект успешно обновлен')
      } else {
        await api.post('/special-projects', formData)
        toast.success('Спецпроект успешно создан')
      }
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Редактировать спецпроект' : 'Создать спецпроект'}
      showBorders={true}
      footer={
        <>
          <Button variant="secondary" size="default" onClick={onClose} disabled={isPending} className="mr-auto">
            Отмена
          </Button>
          <Button
            variant="primary"
            size="default"
            onClick={() => formRef.current?.requestSubmit()}
            disabled={isPending}
          >
            {isPending ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </>
      }
    >
      <ProjectForm ref={formRef} initialData={project} onSubmit={handleSubmit} />
    </Modal>
  )
}
