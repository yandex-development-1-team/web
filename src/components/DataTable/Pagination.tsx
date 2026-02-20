interface PaginationProps {
  page: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, perPage, total, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)
  const pages = Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-1">
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-white border'}`}
        >
          {p}
        </button>
      ))}
      {totalPages > 10 && <span>...</span>}
    </div>
  )
}
