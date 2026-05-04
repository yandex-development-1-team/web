import { ManageBoxModal } from '@/components/BoxModals'
import { BoxDetailsModal } from '@/components/BoxModals/BoxDetailsModal/BoxDetailsModal'
import { BoxButton, DeleteModal } from '@/components/ui'
import { Pagination } from '@/components/ui/Pagination'
import { PERMISSIONS, usePermissions } from '@/hooks/usePermissions'
import { BOX_SOLUTIONS_KEYS } from '@/services/api/queryKeys'
import { useState } from 'react'
import { boxSolutionApi } from './api/api'
import { useFetchBoxes } from './queries/queries'
import type { ModalStateType } from './types'
import { Boxes } from './ui/Boxes'
import { QueryFilters } from './ui/QueryFilters'

const BoxSolutions = () => {
  const [modal, setModal] = useState<ModalStateType | null>(null)
  const { boxes, pagination, isError, isPending, isLoading } = useFetchBoxes()
  const { hasAccess } = usePermissions()

  if (isError) return <div className="text-text">Ошибка при получении данных</div>

  const isShowDetails = modal?.type === 'details'
  const isShowSolutions = modal?.type === 'create' || modal?.type === 'edit'
  const isShowDelete = modal?.type === 'delete'
  const isEmptyList = !boxes?.length && !isPending

  return (
    <div className="flex flex-col gap-5 min-w-180">
      <div className="flex justify-between h-18">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
        {hasAccess(PERMISSIONS.boxesCreate) && (
          <BoxButton
            size={'small'}
            icon="box"
            className="text-text p-5 w-85"
            onClick={() => {
              setModal({ type: 'create', id: null })
            }}
          >
            Создать коробку
          </BoxButton>
        )}
      </div>
      <QueryFilters className="min-h-max" />
      <div className="flex flex-col gap-5 min-w-180">
        {isEmptyList ? (
          <div className="text-text">Коробочные решения не найдены</div>
        ) : (
          <Boxes
            boxList={boxes}
            isLoading={isLoading}
            onDelete={(id: string) => setModal({ type: 'delete', id })}
            onEdit={(id: string) => setModal({ type: 'edit', id })}
            onDetailsView={(id: string) => setModal({ type: 'details', id })}
            pagination={<Pagination pagination={pagination} />}
          />
        )}
        {isShowDelete && (
          <DeleteModal
            title="Удалить коробку!"
            isOpen={true}
            onDelete={() => boxSolutionApi.deleteBox(modal?.id || null)}
            onClose={() => setModal(null)}
            itemId={modal?.id || null}
            queryKey={BOX_SOLUTIONS_KEYS.all}
          >
            Вы действительно хотите удалить эту коробку?
          </DeleteModal>
        )}
        {isShowSolutions && (
          <ManageBoxModal
            isOpen={true}
            onClose={() => setModal(null)}
            boxId={modal?.id || null}
            queryKey={BOX_SOLUTIONS_KEYS.all}
          />
        )}
        {isShowDetails && <BoxDetailsModal boxId={modal?.id || null} isOpen={true} onClose={() => setModal(null)} />}
      </div>{' '}
    </div>
  )
}

export const Component = BoxSolutions
