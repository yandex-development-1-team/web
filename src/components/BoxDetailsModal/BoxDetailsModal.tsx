import { BoxDetails } from '@/components/BoxDetailsModal/BoxDetails'

import type { IBox } from '@/pages/BoxSolutions/BoxSolutions.types'
import { Modal } from '../ui'

export const BoxDetailsModal = ({
  boxId,
  isOpen,
  onClose,
  onFetchBox
}: {
  boxId: number | undefined | null
  isOpen: boolean
  onClose: () => void
  onFetchBox: (id: string | null) => IBox | undefined
}) => {
  if (!boxId) return null

  const box = onFetchBox(boxId.toString())

  if (!box) return <p>Данные не найдены</p>
  const { name } = box

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={name}>
      <BoxDetails box={box}></BoxDetails>
    </Modal>
  )
}
