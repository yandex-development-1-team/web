import type { Column } from '@/components/DataTable/DataTable.types'
import type { TEvent } from '@/types/schedule.types'

export type TScheduleTable = {
  optionColums: Column<TEvent>[]
  events: TEvent[]
  totalEvents: number
  loadedCount: number
  onSelect: (select: TEvent[]) => void
  onLoadMore: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  isLoading?: boolean
}
