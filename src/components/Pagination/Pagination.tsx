import { cn } from '@/lib/utils.clsx'
import type { IPagination } from '@/pages/BoxSolutions/BoxSolutions.types'
import type { ComponentProps } from 'react'
import { usePagination } from './hooks/usePagination'
import { PaginationLimit } from './ui/PaginationLimit'
import { PaginationNav } from './ui/PaginationNav'

type PaginationProps = {
  pagination: IPagination | undefined
  limit?: boolean
  nav?: boolean
} & ComponentProps<'div'>

export const Pagination = ({ pagination, limit = true, nav = true, className, ...props }: PaginationProps) => {
  const { prevLink, nextLink, selectedLink, pagesRange, selectedPage, totalPages, changeLimit } =
    usePagination(pagination)

  if (!pagination || pagination.total <= pagination.limit) return null

  return (
    <div className={cn('flex', className)} {...props}>
      {limit && <PaginationLimit limit={pagination.limit} onLimitChange={changeLimit} />}
      {nav && (
        <PaginationNav
          prevLink={prevLink}
          nextLink={nextLink}
          selectedLink={selectedLink}
          pagesRange={pagesRange}
          selectedPage={selectedPage}
          totalPages={totalPages}
          className="ml-auto"
        />
      )}
    </div>
  )
}
