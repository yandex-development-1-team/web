import { BoxDetails } from '@/components/BoxDetailsModal/BoxDetails'
import { Modal } from '@/components/ui'
import type { IBox } from '@/pages/BoxSolutions/BoxSolutions.types'

export const BoxDetailsModal = ({
  boxId,
  isOpen,
  onClose,
  onFetchBox
}: {
  boxId: string
  isOpen: boolean
  onClose: () => void
  onFetchBox: (id: string) => IBox | undefined
}) => {
  if (!boxId) return null

  const box = onFetchBox(boxId)

  if (!box) return <p>Данные не найдены</p>
  const { name } = box

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={name}>
      <BoxDetails box={box}></BoxDetails>
    </Modal>
  )
}
