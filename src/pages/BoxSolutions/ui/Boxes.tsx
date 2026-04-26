import { Loader } from '@/components/ui'
import type { IPagination } from '@/components/ui/Pagination/Pagination.types'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import type { IBox } from '../types'
import { Box } from './Box'

type BoxesProps = {
  boxList: IBox[] | undefined
  pagination?: React.ReactElement<IPagination>
  isLoading: boolean
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onDetailsView: (id: string) => void
} & ComponentProps<'div'>

export const Boxes = ({
  boxList,
  isLoading,
  onDelete,
  onEdit,
  onDetailsView,
  pagination,
  className,
  ...props
}: BoxesProps) => {
  if (isLoading) return <Loader />
  return (
    <div className={cn('flex flex-col gap-10', className)} {...props}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {boxList?.map(box => {
          const id = String(box.id)
          return (
            <Box
              box={box}
              key={box.id}
              onDelete={() => onDelete(id)}
              onEdit={() => onEdit(id)}
              onDetailsView={(id: string) => onDetailsView(id)}
            />
          )
        })}
      </div>
      {pagination}
    </div>
  )
}
