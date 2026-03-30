import { DataTable, Input } from '@/components/ui'
import { Calendar } from '@/components/ui/CalendarInput/ui/Calendar'
import type { TScheduleCalendar } from './ScheduleCalendar.type'
import { useEffect, useState, type ChangeEvent } from 'react'
import { SearchIcon } from '@/assets/icons'
import { formatDate, parseToDate } from '@/lib/utils.date'
import useDebounce from '@/hooks/useDebounce'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'

export const ScheduleCalendar = (props: TScheduleCalendar) => {
  const { onSelect, events, params, optionColums, onLoadMore, hasMore, isLoadingMore, isLoading, pagination } = props

  const [inputValue, setInputValue] = useState(formatDate(new Date(params.date_from)))
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(params.date_from))
  const [isValidInput, setIsValidInput] = useState(true)
  const [inputSearch, setInputSearch] = useState('')
  const [dataItem, setDataItem] = useState(events)
  const debouncedSearch = useDebounce(inputSearch, 500)

  useEffect(() => {
    const filterItems = () => {
      if (!debouncedSearch.trim()) {
        setDataItem(events)
        return
      }

      const filtered = events.filter(
        item =>
          item.location?.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase()) ||
          item?.box_name.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase())
      )
      setDataItem(filtered)
    }

    filterItems()
  }, [debouncedSearch, events])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsValidInput(true)
  }

  const handleBlur = () => {
    const parsedDate = parseToDate(inputValue)

    if (parsedDate) {
      onSelect(parsedDate)
      setCalendarMonth(parsedDate)
      setInputValue(formatDate(parsedDate))
      setIsValidInput(true)
    } else {
      setIsValidInput(false)
    }
  }

  const handleDateSelect = (date: Date) => {
    const formatted = formatDate(date)
    setInputValue(formatted)
    setCalendarMonth(date)
    setIsValidInput(true)
    onSelect(date)
  }

  const handleMonthChange = (month: Date) => {
    setCalendarMonth(month)
  }
  const transformedData = dataItem.map(event => ({
    ...event,
    time: event.time?.from || ''
  }))

  return (
    <div className="flex felx-col gap-5 flex-wrap">
      <div>
        <Calendar
          mode="single"
          selected={parseToDate(inputValue)}
          month={calendarMonth}
          onMonthChange={handleMonthChange}
          onSelect={handleDateSelect}
          required
        />
      </div>

      <div className="flex flex-col grow gap-2">
        <div className="flex gap-2">
          <Input
            variant="text"
            className=" min-w-25 flex-1 p-2"
            aria-invalid={!isValidInput}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Дата"
          />
          <Input
            variant="icon"
            icon={<SearchIcon className="size-4" />}
            value={inputSearch}
            placeholder="Поиск"
            onChange={e => {
              setInputSearch(e.target.value)
            }}
          />
        </div>

        <DataTable
          columns={optionColums}
          data={transformedData}
          idKey="id"
          initialPageSize={params.limit}
          enableLoadMore={true}
          isLoading={isLoading}
        />

        <div className="flex items-center justify-between">
          <Pagination variant="limit" pagination={pagination} />

          <div className="flex justify-end">
            {hasMore && (
              <Button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                variant="ghost"
                className="border border-transparent text-grey-dark "
              >
                {isLoadingMore ? <>Загрузка...</> : 'Показать больше'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
