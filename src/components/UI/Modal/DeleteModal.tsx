import { useState } from 'react'
import { Modal } from './Modal'
import { deleteItemById } from './api/deleteService'
import styles from './DeleteModal.module.css'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string | number | null // получаем ID из modalData хука
  onSuccess?: () => void // коллбэк для обновления списка после удаления
}

export const DeleteModal = ({ isOpen, onClose, itemId, onSuccess }: DeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!itemId) return

    setIsDeleting(true)
    try {
      await deleteItemById(itemId)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Ошибка удаления:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить заявку?"
      footer={
        <>
          <button className={styles.cancelBtn} onClick={onClose} disabled={isDeleting}>
            Отмена
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete} disabled={!itemId || isDeleting}>
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </button>
        </>
      }
    >
      <div className={styles.deleteContent}>
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить.</p>
      </div>
    </Modal>
  )
}
