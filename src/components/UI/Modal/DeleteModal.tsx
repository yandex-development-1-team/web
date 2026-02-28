import { Modal } from './Modal'
import { Button } from '@/components/ui/Button'
import { useDeleteItem } from './useDeleteItem'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | number | null
  onDelete: (id: string | number) => Promise<void>
  title?: string
  children?: React.ReactNode
}

export const DeleteModal = ({ isOpen, onClose, itemId, onDelete, title = 'Удалить ?', children }: DeleteModalProps) => {
  const { mutate, isPending } = useDeleteItem(onDelete, onClose)

  const handleConfirm = () => {
    if (itemId !== null && itemId !== undefined) {
      mutate(itemId)
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
          <Button variant="secondary" size="default" onClick={onClose} disabled={isPending}>
            Отмена
          </Button>
          <Button
            variant="danger"
            size="default"
            onClick={handleConfirm}
            disabled={itemId === null || itemId === undefined || isPending}
          >
            {isPending ? 'Удаление...' : 'Удалить'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-1">{children}</div>
    </Modal>
  )
}
