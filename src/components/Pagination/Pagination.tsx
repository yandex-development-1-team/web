import { ArrowIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import type { IPagination } from '@/pages/BoxSolutions/BoxSolutions.types'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { usePagination } from './hooks/usePagination'

type PaginationProps = {
  pagination: IPagination | undefined
} & ComponentProps<'div'>

export const Pagination = ({ pagination, className, ...props }: PaginationProps) => {
  const { prevPageLink, nextPageLink, selectedPageLink, pages, currentPage, totalPages } = usePagination(pagination)

  if (!pagination || pagination.total <= pagination.limit) return null

  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <Link to={prevPageLink} className={`p-2 ${currentPage <= 1 ? 'opacity-40 pointer-events-none' : 'text-text'}`}>
        <ArrowIcon className="rotate-90 w-4 h-4" />
      </Link>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-text">
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            to={selectedPageLink(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md 
              ${page === currentPage ? 'border border-yellow-accent-light bg-white text-text' : 'text-grey-light'}`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        to={nextPageLink}
        className={`p-2 ${currentPage >= totalPages ? 'opacity-40 pointer-events-none' : 'text-text'}`}
      >
        <ArrowIcon className="rotate-270 w-4 h-4" />
      </Link>
    </div>
  )
}
