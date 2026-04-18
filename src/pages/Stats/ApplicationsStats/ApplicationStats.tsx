import { useNotification } from '@/app/providers/notification'
import { Diagram, DownloadIcon } from '@/assets/icons'
import { Button, CalendarInput } from '@/components/ui'
import { Chart } from '@/components/ui/Chart'
import { formatDateISO } from '@/lib/utils.date'
import type { BoxStatsSearchParams, DateRangeField } from '@/pages/Stats/ApplicationsStats/ApplicationStats.types'
import { useBoxNameAutocomplete } from '@/pages/Stats/ApplicationsStats/hooks/useBoxNameAutocomplete'
import { useBoxNames } from '@/pages/Stats/ApplicationsStats/hooks/useBoxNames'
import { useBoxStats } from '@/pages/Stats/ApplicationsStats/hooks/useBoxStats'
import { isValidDateRange } from '@/pages/Stats/ApplicationsStats/utils/isValidDateRange'
import {
  mapLoadedSeriesToChartData,
  mapLoadedSeriesToTableRows
} from '@/pages/Stats/ApplicationsStats/utils/mapBoxStats'
import { ApplicationTable } from '@/pages/Stats/ApplicationsStats/ui/ApplicationTable'
import { BoxNameSearchField } from '@/pages/Stats/ApplicationsStats/ui/BoxNameSearchField'
import { useCallback, useMemo, useState } from 'react'

const ApplicationStats = () => {
  const { showNotification } = useNotification()
  const [dateRange, setDateRange] = useState<{
    dateFrom: Date | undefined
    dateTo: Date | undefined
  }>({
    dateFrom: undefined,
    dateTo: undefined
  })
  const [chartVisible, setChartVisible] = useState(false)

  const { boxNames } = useBoxNames()
  const nameSearch = useBoxNameAutocomplete(boxNames)
  const { loadedSeries, appendSeries, isAppending } = useBoxStats()

  const isDateRangeValid = isValidDateRange(dateRange.dateFrom, dateRange.dateTo)

  const tableRows = useMemo(() => mapLoadedSeriesToTableRows(loadedSeries), [loadedSeries])
  const chartData = useMemo(() => mapLoadedSeriesToChartData(loadedSeries), [loadedSeries])

  const clearFilters = () => {
    nameSearch.reset()
    setDateRange({
      dateFrom: undefined,
      dateTo: undefined
    })
  }

  const handleDateChange = (field: DateRangeField) => (date: Date | undefined) => {
    setDateRange(prev => ({
      ...prev,
      [field]: date
    }))
  }

  const handleAddToTable = useCallback(() => {
    if (!isDateRangeValid || !dateRange.dateFrom || !dateRange.dateTo || !nameSearch.pickedName) {
      return
    }

    const params: BoxStatsSearchParams = {
      dateFrom: formatDateISO(dateRange.dateFrom),
      dateTo: formatDateISO(dateRange.dateTo),
      search: nameSearch.pickedName
    }

    appendSeries(params, {
      onSuccess: () => clearFilters(),
      onError: () => {
        showNotification({
          status: 'error',
          message: 'Ошибка при добавлении данных'
        })
      }
    })
  }, [
    isDateRangeValid,
    dateRange.dateFrom,
    dateRange.dateTo,
    nameSearch.pickedName,
    appendSeries,
    clearFilters,
    showNotification
  ])

  const handleDownload = () => {}

  const toggleChart = () => {
    setChartVisible(prev => !prev)
  }

  const canSubmit =
    isDateRangeValid && !isAppending && !nameSearch.invalid && !!nameSearch.query && !!nameSearch.pickedName

  return (
    <>
      <div className="bg-white text-text-black-dark px-5 pb-5 rounded-lg">
        <h2 className="text-h2 py-[18px_13px]">Заявки по коробке</h2>
        <h4 className="text-h4sb pb-3.5">Сравнение посещений за период</h4>
        <div className="grid grid-cols-1 min-[1235px]:grid-cols-[548px_1fr] gap-5 items-end mt-8">
          <BoxNameSearchField autocomplete={nameSearch} disabled={isAppending} />
          <div className="grid grid-cols-1 min-[1235px]:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-text-grey-medium">Период с</span>
              <CalendarInput
                variant="single"
                value={dateRange.dateFrom}
                onChange={handleDateChange('dateFrom')}
                disabled={isAppending}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-text-grey-medium">Период по</span>
              <CalendarInput
                variant="single"
                value={dateRange.dateTo}
                onChange={handleDateChange('dateTo')}
                disabled={isAppending}
              />
            </div>
          </div>
          <div className="flex flex-wrap min-[1235px]:justify-between gap-3">
            <Button disabled={!canSubmit} className="h-11.5 px-8 py-3" onClick={handleAddToTable}>
              {isAppending ? 'Добавление...' : 'Добавить в таблицу'}
            </Button>

            <Button
              disabled={isAppending}
              variant="secondary"
              className="size-11.5 border-grey-light"
              onClick={handleDownload}
            >
              <DownloadIcon />
            </Button>
          </div>
          <ApplicationTable data={tableRows} />
          <Button
            leftIcon={<Diagram className="size-6" />}
            variant="ghost"
            className="w-55.25 h-12 shadow-[0px_1px_3px_1px_#00000026,0px_1px_2px_0px_#0000004D]"
            onClick={toggleChart}
            disabled={chartData.periods.length === 0}
          >
            {!chartVisible ? 'Посмотреть график' : 'Скрыть график'}
          </Button>
        </div>
      </div>
      {chartVisible && (
        <div className="grid grid-cols gap-8.5 bg-white pl-0 p-5 mt-5 rounded-lg">
          <Chart data={chartData} />
        </div>
      )}
    </>
  )
}

export const Component = ApplicationStats
