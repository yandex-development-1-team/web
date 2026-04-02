import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { TTableEvent, TEvent } from '@/types/schedule.types'

export type TScheduleTable = {
  optionColums: Column<TTableEvent>[]
  events: TEvent[]
  loadedCount: number
  onSelect: (select: TTableEvent[]) => void
  onLoadMore: () => void
  hasMore?: boolean
  isLoadingMore?: boolean
  isLoading?: boolean
}
