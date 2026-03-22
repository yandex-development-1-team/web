import type { ReactNode } from 'react'
import type { PaginationProps } from '../Pagination/Pagination.types'

export interface Column<T, K extends keyof T = keyof T> {
  key: K
  label: string
  sortable?: boolean
  render?: (value: T[K], row: T) => ReactNode
  className?: string
}

export interface SortConfig<T> {
  key: keyof T
  direction: 'asc' | 'desc'
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  error?: string | null
  enablePagination?: boolean
  enableLoadMore?: boolean
  enableCheckboxes?: boolean
  pagination?: React.ReactElement<PaginationProps>

  rowActions?: (row: T) => ReactNode

  idKey: keyof T
  initialPageSize?: number

  onSort?: (config: SortConfig<T>) => void
  onLoadMore?: () => void
  onSelect?: (selected: T[]) => void
}
