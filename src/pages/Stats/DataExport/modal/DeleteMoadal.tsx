import { Modal } from './Modal'
import { Button } from '@/components/ui/Button'
import { useDeleteFile } from '../hooks/useDeleteFile'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | number | null
  onDelete?: (id: string | number) => Promise<void>
  title?: string
  children?: React.ReactNode
}

export const DeleteModal = ({ isOpen, onClose, itemId, title = 'Удалить ?', children }: DeleteModalProps) => {
  const { mutate, isPending, isError, reset } = useDeleteFile()

  const handleDelete = () => {
    if (isError) reset()
    if (itemId) mutate(itemId.toString())
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      showBorders={false}
      footer={
        <>
          <Button variant="secondary" size="default" onClick={handleClose} disabled={isPending}>
            Отмена
          </Button>
          <Button variant="default" size="default" onClick={handleDelete} disabled={!itemId || isPending}>
            {isPending ? 'Удаление...' : 'Удалить'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-1">{children}</div>
    </Modal>
  )
}
