import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { usePaginationLimit } from './hooks/usePaginationLimit'
import { usePaginationNav } from './hooks/usePaginationNav'
import type { IPagination } from './Pagination.types'
import { PaginationLimit } from './ui/PaginationLimit'
import { PaginationNav } from './ui/PaginationNav'

type PaginationProps = {
  pagination?: IPagination | undefined
  variant?: 'default' | 'limit' | 'nav'
} & ComponentProps<'div'>

export const Pagination = ({ pagination, variant = 'default', className, ...props }: PaginationProps) => {
  const { nav, pagesRange, selectedPage, totalPages } = usePaginationNav(pagination)
  const { changeLimit } = usePaginationLimit()

  if (!pagination || pagination.total <= pagination.limit) return null

  const showLimit = variant === 'default' || variant === 'limit'
  const showNav = variant === 'default' || variant === 'nav'

  return (
    <div className={cn('flex', className)} {...props}>
      {showLimit && <PaginationLimit limit={pagination.limit} onLimitChange={changeLimit} />}
      {showNav && (
        <PaginationNav
          nav={nav}
          pagesRange={pagesRange}
          selectedPage={selectedPage}
          totalPages={totalPages}
          className="ml-auto"
        />
      )}
    </div>
  )
}
