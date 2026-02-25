import PageSizeSelector from './PageSizeSelector'
import Pagination from './Pagination'

interface TableControlsProps {
  pageSize: number
  currentPage: number
  totalItems: number
  onPageSizeChange: (size: number) => void
  onPageChange: (page: number) => void
}

export const TableControls = ({
  pageSize,
  currentPage,
  totalItems,
  onPageSizeChange,
  onPageChange
}: TableControlsProps) => {
  const totalPages = Math.ceil(totalItems / pageSize)
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-between items-center p-4 ">
      <PageSizeSelector pageSize={pageSize} onPageSizeChange={onPageSizeChange} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
