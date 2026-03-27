import { useModal } from '@/components/ui/Modal/useModal'
import { Button } from '@/components/ui'
import { BoxApplicationModal } from './ui/BoxApplicationModal'
import type { TApplicationStatus } from '@/types/applications'
import { mockBoxApplicationData } from '@/mockData/mockBoxApplicationData'

const Applications = () => {
  const {
    isOpen: isOpenBoxApplicationModal,
    open: openBoxApplicationModal,
    close: closeBoxApplicationModal
  } = useModal()

  const handleDelete = async (id: string | number) => void id

  const handleEdit = async (id: string | number, status: TApplicationStatus) => {
    mockBoxApplicationData.processing.status = status
    return void { id, status }
  }

  return (
    <>
      <h1>Заявки</h1>
      <p>Страница в разработке... </p>

      <br />
      <br />
      <Button type="button" size="normal" className="cursor-pointer w-60" onClick={() => openBoxApplicationModal()}>
        Box Заявка Modal Mock
      </Button>

      <BoxApplicationModal
        isOpen={isOpenBoxApplicationModal}
        onClose={closeBoxApplicationModal}
        onDelete={handleDelete}
        onEdit={handleEdit}
        data={mockBoxApplicationData}
      />
    </>
  )
}

export const Component = Applications
