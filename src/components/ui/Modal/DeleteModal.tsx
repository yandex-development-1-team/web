import { queryClient } from '@/app/providers/tanstack-query/queryClient'
import { Button } from '@/components/ui/Button'
import { Modal } from './Modal'
import { useDeleteItem } from './useDeleteItem'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | number | null
  onDelete: (id: string | number) => Promise<void>
  queryKey?: readonly string[]
  title?: string
  children?: React.ReactNode
}

export const DeleteModal = ({
  isOpen,
  onClose,
  itemId,
  onDelete,
  queryKey,
  title = 'Удалить ?',
  children
}: DeleteModalProps) => {
  const { deleteItem, isPending } = useDeleteItem(onDelete)

  const handleConfirm = async () => {
    if (itemId !== null && itemId !== undefined) {
      try {
        await deleteItem(itemId)
        onClose()
        queryClient.invalidateQueries({ queryKey })
      } catch {
        console.error()
      }
    }
  }

  return (
    <Modal
      className="max-w-[412px]"
      overlayClassName="z-51"
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
            Удалить
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-1">{children}</div>
    </Modal>
  )
}
