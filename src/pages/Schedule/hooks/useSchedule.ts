import { useCallback, useMemo, useState } from 'react'
import type { ButtonState } from '@/components/ui/ToggleButton/ToggleButton.types'
import { COLUMN_CALENDAR_CONFIG, COLUMN_TABLE_CONFIG } from '@/pages/Schedule/config'
import type { TTableEvent, TEvent } from '@/types/schedule.types'
import { useEvents } from '@/pages/Schedule/hooks/useEvents'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { useEventParams } from '@/pages/Schedule/hooks/useEventParams'

export const useSchedule = () => {
  const [toggle, setToggle] = useState<ButtonState>('left')
  const [columnTable, setColumnTable] = useState<Column<TTableEvent>[]>(COLUMN_TABLE_CONFIG)
  const [columnCalendar, setColumnCalendar] = useState<Column<TTableEvent>[]>(COLUMN_CALENDAR_CONFIG)

  const [selectedEvents, setSelectedEvents] = useState<TEvent[]>([])

  const { params, setDate } = useEventParams()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEvents(params)
  const events = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data])
  const pagination = data?.pages[data.pages.length - 1].pagination

  const handleToggle = useCallback((side: ButtonState) => {
    setToggle(side)
  }, [])

  const handlePickDate = useCallback(
    (date: Date) => {
      setDate(date)
    },
    [setDate]
  )

  const handleSort = useCallback((key: string) => {
    const updateSortable = (item: Column<TTableEvent>) => ({
      ...item,
      sortable: item.key === key || (item.key === 'date' && key === 'time')
    })

    setColumnTable(prev => prev.map(updateSortable))
    setColumnCalendar(prev => prev.map(updateSortable))
  }, [])

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleSelect = useCallback(
    (select: TTableEvent[]) => {
      const selectedIds = select.map(item => item.id)
      const data = events.filter(event => selectedIds.includes(event.id))
      setSelectedEvents(data)
    },
    [events]
  )

  return {
    toggle,
    columnTable,
    columnCalendar,
    events,
    params,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleToggle,
    handlePickDate,
    handleSort,
    handleLoadMore,
    selectedEvents,
    handleSelect,
    pagination
  }
}
