import { useQuery } from '@tanstack/react-query'
import { Modal } from '../../ui'
import { getBox } from '../api/getBox'
import { BoxDetails } from './BoxDetails'

type BoxDetailsModalPropsType = {
  boxId: string | null
  isOpen: boolean
  onClose: () => void
}

export const ViewBoxModal = ({ boxId, isOpen, onClose }: BoxDetailsModalPropsType) => {
  const { data: box } = useQuery({
    queryKey: ['box', boxId],
    queryFn: () => getBox(boxId)
  })

  if (!box)
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <p>Данные не найдены</p>
      </Modal>
    )

  const { name } = box

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={name}>
      <BoxDetails box={box} />
    </Modal>
  )
}
