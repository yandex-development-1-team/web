import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '@/components/ui/Button'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | number | null
  onDelete: (id: string | number) => Promise<void>
}

export const DeleteModal = ({ isOpen, onClose, itemId, onDelete }: DeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!itemId) return

    setIsDeleting(true)
    try {
      await onDelete(itemId)
      onClose()
    } catch (error) {
      console.error('Ошибка в DeleteModal:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить заявку?"
      showBorders={false}
      footer={
        <>
          <Button variant="secondary" size="default" onClick={onClose} disabled={isDeleting}>
            Отмена
          </Button>
          <Button variant="primary" size="default" onClick={handleDelete} disabled={!itemId || isDeleting}>
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-1">
        <p className="m-0 text-black">Вы действительно хотите удалить эту заявку?</p>
        <p className="m-0 text-black">Действие нельзя отменить.</p>
      </div>
    </Modal>
  )
}
