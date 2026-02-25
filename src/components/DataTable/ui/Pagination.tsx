import { ArrowIcon } from '@/assets/icons'
import { PaginationLogic } from '../helpers'
type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={`p-2 ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        <ArrowIcon className="rotate-90 w-4 h-4" />
      </button>

      {PaginationLogic(currentPage, totalPages).map((item, index) => (
        <button
          key={typeof item === 'number' ? `page-${item}` : `ellipsis-${index}`}
          disabled={item === '...'}
          onClick={() => {
            if (item !== '...') onPageChange(item as number)
          }}
          className={`w-[32px] h-8 flex items-center justify-center rounded-md text-xxs
      ${
        item === currentPage
          ? 'text-black border border-yellow-accent-light'
          : 'text-grey-light border border-transparent'
      }`}
        >
          {item}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={`p-2 ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        <ArrowIcon className="rotate-270 w-4 h-4" />
      </button>
    </div>
  )
}
