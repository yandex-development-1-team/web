import { ArrowIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { usePagination } from './hooks/usePagination'

type PaginationProps = {
  currentPage: number
  totalPages: number
} & ComponentProps<'div'>

export const Pagination = ({ currentPage, totalPages, className, ...props }: PaginationProps) => {
  const { prevPage, nextPage, selectedPage, pagesRange } = usePagination(currentPage, totalPages)

  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <Link to={prevPage} className={`p-2 ${currentPage <= 1 ? 'opacity-40 pointer-events-none' : 'text-text'}`}>
        <ArrowIcon className="rotate-90 w-4 h-4" />
      </Link>

      {pagesRange.map((item, index) =>
        item === '...' ? (
          <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-text">
            ...
          </span>
        ) : (
          <Link
            key={`page-${item}`}
            to={selectedPage(item)}
            className={`w-8 h-8 flex items-center justify-center rounded-md 
              ${item === currentPage ? 'border border-yellow-accent-light bg-white text-text' : 'text-grey-light'}`}
          >
            {item}
          </Link>
        )
      )}

      <Link
        to={nextPage}
        className={`p-2 ${currentPage >= totalPages ? 'opacity-40 pointer-events-none' : 'text-text'}`}
      >
        <ArrowIcon className="rotate-270 w-4 h-4" />
      </Link>
    </div>
  )
}
