import { useCallback, useMemo, useState } from 'react'
import type { ButtonState } from '@/components/ui/ToggleButton/ToggleButton.types'
import {
  COLUMN_CALENDAR_CONFIG,
  COLUMN_TABLE_CONFIG,
  SORT_OPTIONS_CALENDAR,
  SORT_OPTIONS_TABLE
} from '@/pages/Schedule/config'
import type { TTableEvent, TEvent } from '@/types/schedule.types'
import { useEvents } from '@/pages/Schedule/hooks/useEvents'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { useEventParams } from '@/pages/Schedule/hooks/useEventParams'

export const useSchedule = () => {
  const [toggle, setToggle] = useState<ButtonState>('left')
  const [columnTable, setColumnTable] = useState<Column<TTableEvent>[]>(COLUMN_TABLE_CONFIG)
  const [columnCalendar, setColumnCalendar] = useState<Column<TTableEvent>[]>(COLUMN_CALENDAR_CONFIG)

  const [tableSortOptions, setTableSortOptions] = useState(SORT_OPTIONS_TABLE)
  const [calendarSortOptions, setCalendarSortOptions] = useState(SORT_OPTIONS_CALENDAR)

  const sortOptions = toggle === 'left' ? tableSortOptions : calendarSortOptions

  const [selectedEvents, setSelectedEvents] = useState<TEvent[]>([])

  const { params, setDate } = useEventParams()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEvents(params)

  const events = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data])
  const pagination = data?.pages[data.pages.length - 1].pagination

  const handleToggle = (side: ButtonState) => {
    setToggle(side)
  }

  const handlePickDate = useCallback(
    (date: Date) => {
      setDate(date)
    },
    [setDate]
  )

  const handleSort = useCallback(
    (selectedValue: string) => {
      const updateSortable = (item: Column<TTableEvent>) => ({
        ...item,
        sortable: item.key === selectedValue || (item.key === 'date' && selectedValue === 'time')
      })

      if (toggle === 'left') {
        setTableSortOptions(prev =>
          prev.map(option => ({
            ...option,
            active: option.value === selectedValue
          }))
        )
        setColumnTable(prev => prev.map(updateSortable))
      } else {
        setCalendarSortOptions(prev =>
          prev.map(option => ({
            ...option,
            active: option.value === selectedValue
          }))
        )
        setColumnCalendar(prev => prev.map(updateSortable))
      }
    },
    [toggle]
  )

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
    sortOptions,
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
