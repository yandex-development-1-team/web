import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { usePaginationLimit } from './hooks/usePaginationLimit'
import { usePaginationNav } from './hooks/usePaginationNav'
import type { IPagination } from './Pagination.types'
import { PaginationLimit } from './ui/PaginationLimit'
import { PaginationNav } from './ui/PaginationNav'

type PaginationProps = {
  pagination?: IPagination | undefined
  limit?: boolean
  nav?: boolean
} & ComponentProps<'div'>

export const Pagination = ({ pagination, limit = true, nav = true, className, ...props }: PaginationProps) => {
  const { prev, next, current, pagesRange, selectedPage, totalPages } = usePaginationNav(pagination)
  const { changeLimit } = usePaginationLimit()

  if (!pagination || pagination.total <= pagination.limit) return null

  return (
    <div className={cn('flex', className)} {...props}>
      {limit && <PaginationLimit limit={pagination.limit} onLimitChange={changeLimit} />}
      {nav && (
        <PaginationNav
          prev={prev}
          next={next}
          current={current}
          pagesRange={pagesRange}
          selectedPage={selectedPage}
          totalPages={totalPages}
          className="ml-auto"
        />
      )}
    </div>
  )
}
