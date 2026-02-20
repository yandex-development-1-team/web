import type { ReactNode } from 'react'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => ReactNode
  className?: string
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  error?: string | null
  enablePagination?: boolean
  enableLoadMore?: boolean
  enableCheckboxes?: boolean
  enableRowActions?: boolean
  rowActions?: (row: T) => React.ReactNode
  idKey: keyof T
  initialPageSize?: number
  onSort?: (config: SortConfig) => void
  onLoadMore?: () => void
  onSelect?: (selected: T[]) => void
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}
