import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/providers/axios'
import { Modal } from '@/components/ui/Modal'
import { ProjectForm, type ProjectFormValues } from './ProjectForm'
import { Button } from '@/components/ui/Button'
import { useNotification } from '@/app/providers/notification'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project?: ProjectFormValues & { id?: string | number }
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('isActive', String(data.isActive))

      if (data.image instanceof File) {
        formData.append('image', data.image)
      }

      if (project?.id) {
        return api.put(`/special-projects/${project.id}`, formData)
      }
      return api.post('/special-projects', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['special-projects'] })

      showNotification({
        status: 'success',
        message: project ? 'Спецпроект успешно обновлен' : 'Спецпроект успешно создан'
      })

      onClose()
    },
    onError: error => {
      console.error(error)
      showNotification({
        status: 'error',
        message: 'Произошла ошибка при сохранении'
      })
    }
  })

  const handleSubmit = (data: ProjectFormValues) => {
    mutate(data)
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
