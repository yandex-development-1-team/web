import type { IPagination } from '@/components/ui/Pagination/Pagination.types'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import type { IBox } from '../BoxSolutions.types'
import { Box } from './Box'

type BoxesProps = {
  boxesList: IBox[] | undefined
  pagination?: React.ReactElement<IPagination>
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  onDetailsView: (id: number) => void
} & ComponentProps<'div'>

export const Boxes = ({ boxesList, onDelete, onEdit, onDetailsView, pagination, className, ...props }: BoxesProps) => {
  return (
    <div className={cn('flex flex-col gap-10', className)} {...props}>
      <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
        {boxesList?.map(box => {
          return (
            <Box
              box={box}
              key={box.id}
              onDelete={() => onDelete(box.id)}
              onEdit={() => onEdit(box.id)}
              onDetailsView={(id: number) => onDetailsView(id)}
            />
          )
        })}
      </div>
      {pagination}
    </div>
  )
}
