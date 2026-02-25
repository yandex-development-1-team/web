import { useMemo, useRef, useState } from 'react'
import type { DataTableProps, SortConfig } from './DataTable.types'
import { paginateData, sortData, toggleAllSelection, toggleRowSelection } from './helpers'
import { SkeletonRow } from './ui/Skeleton'
import { TableHeader } from './ui/TableHeade'
import { TableBody } from './ui/TableBody'
import { TableControls } from './ui/TableControls'

export function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>) {
  const {
    data,
    columns,
    rowActions,
    idKey,
    isLoading = false,
    error = null,
    initialPageSize = 10,
    enableCheckboxes = false,
    enablePagination = false,
    enableLoadMore = false
  } = props

  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [loadMoreCount, setLoadMoreCount] = useState(initialPageSize)
  const selectAllRef = useRef<HTMLInputElement>(null)

  const sortedData = useMemo(() => (sortConfig ? sortData(data, sortConfig) : data), [data, sortConfig])

  const displayData = useMemo(() => {
    if (enableLoadMore) return sortedData.slice(0, loadMoreCount)
    return paginateData(sortedData, page, pageSize)
  }, [sortedData, page, pageSize, enableLoadMore, loadMoreCount])

  const handleSort = (key: keyof T) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setSortConfig({ key, direction })
    setPage(1)
  }

  const handleSelectRow = (row: T) => setSelectedRows(prev => toggleRowSelection(prev, row, idKey))

  const handleSelectAll = (all: boolean) => setSelectedRows(prev => toggleAllSelection(prev, displayData, idKey, all))

  const handleLoadMore = () => setLoadMoreCount(prev => prev + pageSize)

  const handlePageChange = (newPage: number) => setPage(newPage)

  if (error) return <div>Не удалось загрузить данные</div>

  if (isLoading) {
    const rowsToShow = Math.min(pageSize, 10)
    return (
      <div className="min-w-[1220px] rounded-lg border bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="h-12 border-b bg-gray-100">
              {enableCheckboxes && <th className="w-12 p-4" />}
              {columns.map((col, index) => (
                <th key={String(col.key ?? index)} className="p-4 text-left">
                  {col.label}
                </th>
              ))}
              {rowActions && <th className="w-24 p-4" />}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowsToShow }).map((_, i) => (
              <SkeletonRow
                key={i}
                columns={columns}
                enableCheckboxes={enableCheckboxes}
                enableRowActions={!!rowActions}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (!columns.length) return <div>Нет данных</div>

  return (
    <div className="overflow-x-auto min-w-[1220px] rounded-lg border border-grey-light bg-white text-color-black text-xs">
      <table className="w-full">
        <TableHeader
          columns={columns}
          enableCheckboxes={enableCheckboxes}
          enableRowActions={!!rowActions}
          onSort={handleSort}
          selectAllRef={selectAllRef}
          onSelectAll={e => handleSelectAll(e.target.checked)}
        />

        <TableBody
          data={displayData}
          columns={columns}
          idKey={idKey}
          enableCheckboxes={enableCheckboxes}
          enableRowActions={!!rowActions}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          rowActions={rowActions}
        />
      </table>

      {enablePagination && displayData.length > 0 && (
        <TableControls
          pageSize={pageSize}
          currentPage={page}
          totalItems={sortedData.length}
          onPageSizeChange={size => setPageSize(size)}
          onPageChange={handlePageChange}
        />
      )}

      {enableLoadMore && displayData.length < sortedData.length && (
        <div className="flex justify-end p-4">
          <button onClick={handleLoadMore} className="border border-transparent text-grey-dark underline">
            Показать больше
          </button>
        </div>
      )}
    </div>
  )
}
