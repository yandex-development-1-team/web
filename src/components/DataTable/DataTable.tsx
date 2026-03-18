import { useState } from 'react'
import type { DataTableProps, SortConfig } from './DataTable.types'
import { sortData, toggleAllSelection, toggleRowSelection } from './helpers'
import { SkeletonRow } from './ui/Skeleton'

import { TableBody } from './ui/TableBody'
import { TableHeader } from './ui/TableHeader'

export function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>) {
  const {
    data,
    columns,
    rowActions,
    idKey,
    isLoading = false,
    error = null,
    enableCheckboxes = false,
    onSelect
  } = props

  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [selectedRows, setSelectedRows] = useState<T[]>([])

  const sortedData = sortConfig ? sortData(data, sortConfig) : data

  const handleSort = (key: keyof T) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setSortConfig({ key, direction })
  }

  const handleSelectRow = (row: T) => {
    const newSelected = toggleRowSelection(selectedRows, row, idKey)
    setSelectedRows(newSelected)
    onSelect?.(newSelected)
  }

  const handleSelectAll = (all: boolean) => {
    const newSelected = toggleAllSelection(selectedRows, sortedData, idKey, all)
    setSelectedRows(newSelected)
    onSelect?.(newSelected)
  }

  if (error) return <div>Не удалось загрузить данные</div>

  if (isLoading || !sortedData) {
    const rowsToShow = 10
    return (
      <div className="rounded-lg border bg-white">
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
    <>
      <div className="overflow-x-auto rounded-lg border border-grey-light bg-white text-color-black text-xs mb-[8px]">
        <table className="w-full">
          <TableHeader
            columns={columns}
            enableCheckboxes={enableCheckboxes}
            enableRowActions={!!rowActions}
            onSort={handleSort}
            onSelectAll={e => handleSelectAll(e.target.checked)}
          />

          <TableBody
            data={sortedData}
            columns={columns}
            idKey={idKey}
            enableCheckboxes={enableCheckboxes}
            enableRowActions={!!rowActions}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            rowActions={rowActions}
          />
        </table>
      </div>
    </>
  )
}
