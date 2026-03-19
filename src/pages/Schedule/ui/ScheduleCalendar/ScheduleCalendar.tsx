import { Input } from '@/components/ui'
import { Calendar } from '@/components/ui/CalendarInput/ui/Calendar'
import type { TScheduleCalendar } from './ScheduleCalendar.type'
import { useEffect, useState, type ChangeEvent } from 'react'
import { SearchIcon } from '@/assets/icons'
import { formatDate, parseToDate } from '@/lib/utils.date'
import { DataTable } from '@/components/DataTable'
import useDebounce from '@/hooks/useDebounce'
import { Button } from '@/components/ui/Button'
import { PageSize } from '@/components/ui/PageSize'

export const ScheduleCalendar = (props: TScheduleCalendar) => {
  const { date, onSelect, events, optionColums, pageSize, setPerPage, onLoadMore, hasMore, isLoadingMore, isLoading } =
    props
  const formattDate = new Date(date)

  const [inputValue, setInputValue] = useState(formatDate(formattDate))
  const [calendarMonth, setCalendarMonth] = useState<Date>(formattDate)
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

      const filtered = events.filter(item =>
        item.location?.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase())
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
            className="basis-0 p-2"
            aria-invalid={!isValidInput}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            variant="icon"
            icon={<SearchIcon className="size-4" />}
            value={inputSearch}
            placeholder=""
            onChange={e => {
              setInputSearch(e.target.value)
            }}
          />
        </div>

        <DataTable
          columns={optionColums}
          data={dataItem}
          idKey="id"
          initialPageSize={pageSize}
          enableLoadMore={true}
          perPage={pageSize}
          isLoading={isLoading}
        />

        <div className="flex items-center justify-between">
          <PageSize pageSize={pageSize} onPageSizeChange={setPerPage} />

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
