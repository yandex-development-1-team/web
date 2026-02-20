import React, { useState, useMemo, useRef } from 'react'
import { paginateData, sortData, toggleRowSelection } from './helpers'
import type { DataTableProps, SortConfig } from './DataTable.types'
import SortIcon from '@/assets/icons/Arrows_Separate_Vertical.svg?react'
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react'
import ArrowRigth from '@/assets/icons/ArrowRigth.svg?react'
import Checked from '@/assets/icons/Check.svg?react'
import { SkeletonRow } from './Skeleton'

const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  error = null,
  enablePagination = false,
  enableLoadMore = false,
  enableCheckboxes = false,
  enableRowActions = false,
  rowActions,
  idKey,
  initialPageSize = 12,
  onSort,
  onLoadMore,
  onSelect
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [displayedData, setDisplayedData] = useState<T[]>([])
  const selectAllRef = useRef<HTMLInputElement>(null)

  const sortedData = useMemo(() => sortData(data, sortConfig), [data, sortConfig])

  const paginatedData = useMemo(
    () => (enablePagination ? paginateData(sortedData, currentPage, pageSize) : sortedData),
    [sortedData, currentPage, pageSize, enablePagination]
  )

  const displayData = enableLoadMore ? displayedData : paginatedData

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    const newConfig = { key, direction }
    setSortConfig(newConfig)
    if (onSort) onSort(newConfig)
  }

  const handlePageSizeChange = (size: number) => {
    const num = Math.max(5, Math.min(200, size))
    setPageSize(num)
    setCurrentPage(1)
  }

  const handleSelectRow = (row: T) => {
    const newSelected = toggleRowSelection(selectedRows, row, idKey)
    setSelectedRows(newSelected)
    if (onSelect) onSelect(newSelected)
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    let newSelected: T[]
    if (checked) {
      newSelected = [...selectedRows, ...paginatedData.filter(row => !selectedRows.some(r => r[idKey] === row[idKey]))]
    } else {
      newSelected = selectedRows.filter(s => !paginatedData.some(r => r[idKey] === s[idKey]))
    }
    setSelectedRows(newSelected)
    if (onSelect) onSelect(newSelected)
  }

  const handleLoadMore = () => {
    if (onLoadMore) onLoadMore()
    const start = displayedData.length
    const nextData = data.slice(start, start + pageSize)
    setDisplayedData(prev => [...prev, ...nextData])
  }

  if (error) {
    return <div>Не удалось загрузить данные</div>
  }

  if (isLoading) {
    return (
      <div className="min-w-[1220px] rounded-lg border border-grey-light  bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-grey-blue-light border-b border-grey-dark h-12">
              {enableCheckboxes && <th className="w-12 p-4" />}
              {columns.map(col => (
                <th key={col.key as string} className="p-4 text-left f text-black">
                  {col.label}
                </th>
              ))}
              {enableRowActions && <th className="w-24 p-4" />}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.min(pageSize, 10) }).map((_, i) => (
              <SkeletonRow
                key={i}
                columns={columns}
                enableCheckboxes={enableCheckboxes}
                enableRowActions={enableRowActions}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (displayData.length === 0) {
    return <div>Нет данных</div>
  }

  const totalPages = Math.ceil(sortedData.length / pageSize)

  return (
    <div className="overflow-x-auto min-w-[1220px] rounded-lg border bg-white border-grey-light">
      <table className="w-full ">
        <thead>
          <tr className="border-b border-grey-light h-12 bg-grey-extra-light">
            {enableCheckboxes && (
              <th className="w-12 ">
                <label className="inline-flex cursor-pointer items-center justify-center">
                  <input ref={selectAllRef} type="checkbox" onChange={handleSelectAll} className="peer sr-only" />
                  <div
                    className={`
                      h-5 w-5 rounded border-2 border-grey-dark bg-white
                      flex items-center justify-center text-white relative
                      peer-checked:bg-black peer-checked:border-black
                      peer-indeterminate:bg-black peer-indeterminate:border-black
                     
                    `}
                  >
                    <Checked className="absolute" />
                  </div>
                </label>
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key as string}
                onClick={col.sortable ? () => handleSort(col.key as string) : undefined}
                className="p-4 text-left text-black"
              >
                <div className="flex items-center gap-1">
                  <span>{col.label}</span>
                  {col.sortable && <SortIcon className="h-4 w-4" />}
                </div>
              </th>
            ))}
            {enableRowActions && <th></th>}
          </tr>
        </thead>

        <tbody>
          {displayData.map(row => (
            <tr key={String(row[idKey])} className="border-b border-grey-light">
              {enableCheckboxes && (
                <td className="w-12 p-4  ">
                  <label className="flex cursor-pointer items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.some(r => r[idKey] === row[idKey])}
                      onChange={() => handleSelectRow(row)}
                      className="peer sr-only"
                    />
                    <div
                      className={`
                        h-5 w-5 rounded border-2 border-grey-dark bg-white
                        flex items-center justify-center text-white
                        peer-checked:bg-black peer-checked:border-black
                        relative
                      `}
                    >
                      <Checked className="absolute" />
                    </div>
                  </label>
                </td>
              )}
              {columns.map(col => (
                <td key={col.key as string} className={`p-4 ${col.className || ''}`}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
              {enableRowActions && (
                <td className="w-24 p-4">
                  <div className="flex justify-center gap-4 text-grey-dark">{rowActions?.(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {enablePagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-grey-light text-sm text-grey-dark">
          <div className="flex items-center gap-3  text-black">
            <span>Показывать по</span>
            <input
              type="text"
              value={pageSize}
              onChange={e => handlePageSizeChange(Number(e.target.value))}
              className="w-10 text-center outline-none inline-flex items-center border text-black border-gray-300 rounded-[8px] py-[10px] px-[12px] bg-white"
              min={5}
              max={200}
            />
          </div>

          {enablePagination && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-40"
              >
                <ArrowLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`
                    w-[32px] h-8 flex items-center justify-center rounded-md text-sm  
                    ${
                      p === currentPage
                        ? ' text-black border border-yellow-accent-light'
                        : 'text-grey-light border border-transparent'
                    }
                  `}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage * pageSize >= sortedData.length}
                className="p-2 rounded"
              >
                <ArrowRigth />
              </button>
            </div>
          )}

          {enableLoadMore && displayedData.length < data.length && (
            <button onClick={handleLoadMore} className="px-5 py-2 bg-black text-white rounded-md ">
              Показать ещё
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export { DataTable }
