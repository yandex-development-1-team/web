import { useCallback, useMemo, useState } from 'react'
import type { ButtonState } from '@/components/ui/ToggleButton/ToggleButton.types'
import type { Column } from '@/components/DataTable/DataTable.types'
import { COLUMN_CALENDAR_CONFIG, COLUMN_TABLE_CONFIG } from '@/pages/Schedule/config'
import type { TEvent } from '@/types/schedule.types'
import type { IParams } from '@/services/schedule.service'
import { formatDateISO } from '@/lib/utils.date'
import { useEvents } from '@/pages/Schedule/hooks/useEvents'

const initialParams: Omit<IParams, 'offset'> = {
  date_from: formatDateISO(new Date()),
  limit: 5
}

export const useSchedule = () => {
  const [toggle, setToggle] = useState<ButtonState>('left')
  const [columnTable, setColumnTable] = useState<Column<TEvent>[]>(COLUMN_TABLE_CONFIG)
  const [columnCalendar, setColumnCalendar] = useState<Column<TEvent>[]>(COLUMN_CALENDAR_CONFIG)
  const [params, setParams] = useState<Omit<IParams, 'offset'>>(initialParams)
  const [selectedEvents, setSelectedEvents] = useState<TEvent[]>([])

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEvents(params)

  const events = useMemo(() => data?.pages.flatMap(page => page.items) ?? [], [data])
  const totalEvents = data?.pages[0]?.pagination.total ?? 0

  const handleToggle = useCallback((side: ButtonState) => {
    setToggle(side)
  }, [])

  const handlePickDate = useCallback((date: Date) => {
    setParams(prev => ({ ...prev, date_from: formatDateISO(date) }))
  }, [])

  const handleSort = useCallback((key: string) => {
    const updateSortable = (item: Column<TEvent>) => ({
      ...item,
      sortable: item.key === key || (item.key === 'date' && key === 'time')
    })

    setColumnTable(prev => prev.map(updateSortable))
    setColumnCalendar(prev => prev.map(updateSortable))
  }, [])

  const handlePerPage = useCallback((num: number) => {
    setParams(prev => ({ ...prev, limit: num }))
  }, [])

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleSelect = useCallback((select: TEvent[]) => {
    setSelectedEvents(select)
  }, [])

  return {
    toggle,
    columnTable,
    columnCalendar,
    params,
    events,
    totalEvents,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleToggle,
    handlePickDate,
    handleSort,
    handlePerPage,
    handleLoadMore,
    selectedEvents,
    handleSelect
  }
}
