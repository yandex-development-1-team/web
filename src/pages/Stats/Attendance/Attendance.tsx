import { useNotification } from '@/app/providers/notification'
import { Diagram, DownloadIcon } from '@/assets/icons'
import { Button, Card } from '@/components/ui'
import { CalendarRangeInput } from '@/components/ui/CalendarInput/ui/CalendarRangeInput'
import { Chart } from '@/components/ui/Chart'
import { SummaryCard } from '@/components/ui/SummaryCard'
import { formatDateISO } from '@/lib/utils.date'
import { useCallback, useMemo, useState } from 'react'
import type { BoxStatsSearchParams } from '../ApplicationsStats/ApplicationStats.types'
import { useBoxNameAutocomplete } from '../ApplicationsStats/hooks/useBoxNameAutocomplete'
import { useBoxNames } from '../ApplicationsStats/hooks/useBoxNames'
import { useBoxStats } from '../ApplicationsStats/hooks/useBoxStats'
import { BoxNameSearchField } from '../ApplicationsStats/ui/BoxNameSearchField'
import { isValidDateRange } from '../ApplicationsStats/utils/isValidDateRange'
import { AttendanceTable } from './AttendanceTable'
import { dashboard } from './configs'
import type { DateRange } from './types'
import { mapLoadedSeriesToChartData, mapLoadedSeriesToTableRows } from './utils/mapBoxStats'
// import { indicators } from './solutionsData'
// import { ManageButton } from './ui/ManageButton'

function periodKey(dateFrom: string, dateTo: string) {
  return `${dateFrom}_${dateTo}`
}

function canCompareByLimits(boxCount: number, periodCount: number) {
  return (periodCount === 1 && boxCount <= 2) || (boxCount === 1 && periodCount <= 3)
}

const Attendance = () => {
  const { showNotification } = useNotification()
  const [chartVisible, setChartVisible] = useState(false)

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const [dateSecondRange, setDateSecondRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const { boxNames } = useBoxNames()
  const nameSearch = useBoxNameAutocomplete(boxNames)

  const { loadedSeries, appendSeries, isAppending, removeSeries } = useBoxStats()

  const isDateRangeValid = isValidDateRange(dateRange.from, dateRange.to)

  const tableRows = useMemo(() => mapLoadedSeriesToTableRows(loadedSeries), [loadedSeries])
  const chartData = useMemo(() => mapLoadedSeriesToChartData(loadedSeries), [loadedSeries])

  const nextComparisonCounts = useMemo(() => {
    const boxes = new Set(loadedSeries.map(item => item.queryParams.search))
    const periods = new Set(loadedSeries.map(item => periodKey(item.queryParams.dateFrom, item.queryParams.dateTo)))

    if (nameSearch.pickedName) {
      boxes.add(nameSearch.pickedName)
    }

    if (dateRange.from && dateRange.to) {
      periods.add(periodKey(formatDateISO(dateRange.from), formatDateISO(dateRange.to)))
    }

    return {
      boxCount: boxes.size,
      periodCount: periods.size
    }
  }, [loadedSeries, nameSearch.pickedName, dateRange.from, dateRange.to])

  const clearFilters = () => {
    nameSearch.reset()
    setDateRange({
      from: undefined,
      to: undefined
    })
    setDateSecondRange({
      from: undefined,
      to: undefined
    })
  }

  const handleDateChange = (field?: DateRange) => {
    setDateRange(prev => ({
      ...prev,
      ...field
    }))
  }

  const handleSecondDateChange = (field?: DateRange) => {
    setDateSecondRange(prev => ({
      ...prev,
      ...field
    }))
  }

  const handleAddToTable = useCallback(() => {
    if (!isDateRangeValid || !dateRange.from || !dateRange.to || !nameSearch.pickedName) {
      return
    }
    const params: BoxStatsSearchParams = {
      dateFrom: formatDateISO(dateRange.from),
      dateTo: formatDateISO(dateRange.to),
      search: nameSearch.pickedName
    }

    // const paramsSecond: BoxStatsSearchParams = {
    //   dateFrom: formatDateISO(dateSecondRange.from),
    //   dateTo: formatDateISO(dateSecondRange.to),
    //   search: nameSearch.pickedName
    // }

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
    dateRange.from,
    dateRange.to,
    nameSearch.pickedName,
    appendSeries,
    clearFilters,
    showNotification
  ])

  const handleDownload = () => {}

  const toggleChart = () => {
    setChartVisible(prev => !prev)
  }

  // const canCompareByLimitsResult = canCompareByLimits(nextComparisonCounts.boxCount, nextComparisonCounts.periodCount)

  const canSubmit =
    isDateRangeValid &&
    !isAppending &&
    !nameSearch.invalid &&
    !!nameSearch.query &&
    !!nameSearch.pickedName &&
    canCompareByLimits(nextComparisonCounts.boxCount, nextComparisonCounts.periodCount)

  // console.log('canSubmit', canSubmit, {
  //   isDateRangeValid,
  //   isAppending,
  //   nameSearch,
  //   canCompareByLimitsResult
  // })

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <h2 className="text-h2 py-[18px_13px]">Средняя посещаемость на коробку</h2>
        <h4 className="text-h4sb pb-3.5">Сводка дня по заявкам</h4>
        <div className="flex text-text gap-5">
          {dashboard.map((item, index) => (
            <SummaryCard data={item} key={index} />
          ))}
        </div>
      </Card>

      <Card className="flex flex-col gap-5">
        <div className="grid grid-cols-1 min-[940px]:grid-cols-[2fr_auto] min-[1335px]:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end">
          <BoxNameSearchField autocomplete={nameSearch} disabled={isAppending} />
          <div className="flex flex-col justify-center">
            <span className="text-xxs text-text-grey-medium">Период 1</span>
            {/*<CalendarInput
              variant="single"
              value={dateRange.dateFrom}
              onChange={handleDateChange('dateFrom')}
              disabled={isAppending}
            />*/}
            <CalendarRangeInput
              key={nameSearch.pickedName}
              value={dateRange}
              onChange={handleDateChange}
              disabled={isAppending}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xxs text-text-grey-medium">Период 2</span>
            {/*<CalendarInput
              variant="single"
              value={dateRange.dateTo}
              onChange={handleDateChange('dateTo')}
              disabled={isAppending}
            />*/}
            <CalendarRangeInput
              key={nameSearch.pickedName}
              value={dateSecondRange}
              onChange={handleSecondDateChange}
              disabled={isAppending}
            />
          </div>

          <div className="flex flex-wrap gap-3">
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
        </div>
        <AttendanceTable data={tableRows} onRemove={removeSeries} />
        <Button
          leftIcon={<Diagram className="size-6" />}
          variant="ghost"
          className="w-55.25 h-12 shadow-[0px_1px_3px_1px_#00000026,0px_1px_2px_0px_#0000004D]"
          onClick={toggleChart}
          disabled={chartData.periods.length === 0}
        >
          {!chartVisible ? 'Посмотреть график' : 'Скрыть график'}
        </Button>
      </Card>

      {chartVisible && (
        <div className="grid grid-cols gap-8.5 bg-white pl-0 p-5 mt-5 rounded-lg">
          <Chart data={chartData} />
        </div>
      )}
      {/*<DeleteModal
        title="Удалить спецпроект?"
        isOpen={!!projectToDelete || projectToDelete === 0}
        onDelete={async id => {
          deleteProject(id)
        }}
        onClose={() => setProjectToDelete(null)}
        itemId={projectToDelete}
      >
        <p>Вы действительно хотите удалить этот спецпроект?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>*/}
    </div>
  )
}
export const Component = Attendance
