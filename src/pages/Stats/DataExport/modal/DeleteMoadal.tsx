import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '@/components/ui/Button'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | number | null
  onDelete: (id: string | number) => Promise<void>
  title?: string
  children?: React.ReactNode
}

export const DeleteModal = ({ isOpen, onClose, itemId, onDelete, title = 'Удалить ?', children }: DeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(false)

  const handleDelete = async () => {
    if (itemId === null || itemId === undefined) return

    setError(false)
    setIsDeleting(true)
    try {
      await onDelete(itemId)
      onClose()
    } catch (error) {
      console.error('Ошибка в DeleteModal:', error)
      setError(true)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showBorders={false}
      footer={
        <>
          <Button variant="secondary" size="default" onClick={onClose} disabled={isDeleting}>
            Отмена
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleDelete}
            disabled={itemId === null || itemId === undefined || isDeleting}
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-1">
        {children}
        {error && (
          <p className="mt-2 text-sm text-red-dark font-medium">Произошла ошибка при удалении. Попробуйте еще раз.</p>
        )}
      </div>
    </Modal>
  )
}
