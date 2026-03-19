import type { Column } from '@/components/DataTable/DataTable.types'
import type { TEvent } from '@/types/schedule.types'

export type TScheduleCalendar = {
  date: string
  onSelect: (date: Date) => void
  events: TEvent[]
  optionColums: Column<TEvent>[]
  pageSize: number
  setPerPage: (num: number) => void
  onLoadMore: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  isLoading?: boolean
}
