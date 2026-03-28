import { ArrowIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { usePaginationNav } from '../hooks/usePaginationNav'

type PaginationNavProps = ReturnType<typeof usePaginationNav> & ComponentProps<'div'>

export const PaginationNav = ({
  prev,
  next,
  current,
  selectedPage: activePage,
  pagesRange,
  totalPages,
  className,
  ...props
}: PaginationNavProps) => {
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <Link to={prev} className={`p-2 ${activePage <= 1 ? 'opacity-40 pointer-events-none' : 'text-text'}`}>
        <ArrowIcon className="rotate-90 w-5 h-5" />
      </Link>

      {pagesRange.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-text">
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            to={current(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-md 
            ${page === activePage ? 'border border-yellow-accent-light bg-white text-text pointer-events-none' : 'text-grey-light'}`}
          >
            {page}
          </Link>
        )
      )}

      <Link to={next} className={`p-2 ${activePage >= totalPages ? 'opacity-40 pointer-events-none' : 'text-text'}`}>
        <ArrowIcon className="rotate-270 w-5 h-5" />
      </Link>
    </div>
  )
}
