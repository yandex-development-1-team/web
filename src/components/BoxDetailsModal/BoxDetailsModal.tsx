import { BoxDetails } from '@/components/BoxDetailsModal/BoxDetails'
import { getBoxById } from '@/pages/BoxSolutions/api/getBoxById'
import { useQuery } from '@tanstack/react-query'
import { Modal } from '../ui'

type BoxDetailsModalPropsType = {
  boxId: string | null
  isOpen: boolean
  onClose: () => void
}

export const BoxDetailsModal = ({ boxId, isOpen, onClose }: BoxDetailsModalPropsType) => {
  const { data: box } = useQuery({
    queryKey: ['box', boxId],
    queryFn: () => getBoxById(boxId)
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
