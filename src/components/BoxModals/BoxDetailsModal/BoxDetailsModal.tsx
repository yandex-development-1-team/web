import { Modal } from '../../ui'
import { useFetchBox } from '../queries/queries'
import { BoxDetails } from './BoxDetails'

type BoxDetailsModalPropsType = {
  isOpen: boolean
  boxId: string | null
  onClose: () => void
}

export const BoxDetailsModal = ({ boxId, isOpen, onClose }: BoxDetailsModalPropsType) => {
  const { data: formData, isLoading } = useFetchBox(boxId)

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Загрузка...">
        <p>Загружаем данные бокса...</p>
      </Modal>
    )
  }

  if (!formData) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <p>Данные не найдены</p>
      </Modal>
    )
  }

  const { name } = formData

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={name}>
      <BoxDetails box={formData} />
    </Modal>
  )
}
