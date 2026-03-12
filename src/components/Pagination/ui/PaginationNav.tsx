import { ArrowIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { usePagination } from '../hooks/usePagination'

type PaginationProps = Omit<ReturnType<typeof usePagination>, 'changeLimit'> & ComponentProps<'div'>

export const PaginationNav = ({
  prevLink,
  nextLink,
  selectedLink,
  selectedPage,
  pagesRange,
  totalPages,
  className,
  ...props
}: PaginationProps) => {
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <Link to={prevLink} className={`p-2 ${selectedPage <= 1 ? 'opacity-40 pointer-events-none' : 'text-text'}`}>
        <ArrowIcon className="rotate-90 w-4 h-4" />
      </Link>

      {pagesRange.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-text">
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            to={selectedLink(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md 
            ${page === selectedPage ? 'border border-yellow-accent-light bg-white text-text pointer-events-none' : 'text-grey-light'}`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        to={nextLink}
        className={`p-2 ${selectedPage >= totalPages ? 'opacity-40 pointer-events-none' : 'text-text'}`}
      >
        <ArrowIcon className="rotate-270 w-4 h-4" />
      </Link>
    </div>
  )
}
