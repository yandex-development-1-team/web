import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { IEventsParams, IPagination, TTableEvent, TEvent } from '@/types/schedule.types'

export type TScheduleCalendar = {
  onSelect: (date: Date) => void
  events: TEvent[]
  params: IEventsParams
  optionColums: Column<TTableEvent>[]
  onLoadMore: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  isLoading?: boolean
  pagination?: IPagination
}
