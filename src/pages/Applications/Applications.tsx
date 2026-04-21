import { useModal } from '@/components/ui/Modal/useModal'
import { Button } from '@/components/ui'
import { BoxApplicationModal } from './ui/BoxApplicationModal'
import { SpecialProjectApplicationModal } from './ui/SpecialProjectApplicationModal'
import type { TApplicationStatus } from '@/types/applications'
import { mockBoxApplicationData } from '@/mockData/mockBoxApplicationData'
import { mockSpecialProjectApplicationData } from '@/mockData/mockSpecialProjectApplicationData'

const Applications = () => {
  const {
    isOpen: isOpenBoxApplicationModal,
    open: openBoxApplicationModal,
    close: closeBoxApplicationModal
  } = useModal()
  const {
    isOpen: isOpenSpecialProjectModal,
    open: openSpecialProjectModal,
    close: closeSpecialProjectModal
  } = useModal()

  const handleDelete = async (id: string | number) => void id

  const handleModify = async (id: string | number, status: TApplicationStatus) => {
    mockBoxApplicationData.processing.status = status
    return void { id, status }
  }
  const handleModifySpecialProject = async (id: string | number, status: TApplicationStatus) => {
    mockSpecialProjectApplicationData.processing.status = status
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
      <Button
        type="button"
        size="normal"
        className="cursor-pointer w-60 ml-4"
        onClick={() => openSpecialProjectModal()}
      >
        Заявка на спецпроект Modal Mock
      </Button>

      <BoxApplicationModal
        isOpen={isOpenBoxApplicationModal}
        onClose={closeBoxApplicationModal}
        onDelete={handleDelete}
        onModify={handleModify}
        data={mockBoxApplicationData}
      />

      <SpecialProjectApplicationModal
        isOpen={isOpenSpecialProjectModal}
        onClose={closeSpecialProjectModal}
        onDelete={handleDelete}
        onModify={handleModifySpecialProject}
        data={mockSpecialProjectApplicationData}
      />
    </>
  )
}

export const Component = Applications
