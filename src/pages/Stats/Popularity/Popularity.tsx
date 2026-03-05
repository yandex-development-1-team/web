import { DownloadIcon, ArrowsUpDownIcon } from '@/assets/icons'
import { Button, CalendarInput } from '@/components/ui'
import { useMemo, useState, useCallback } from 'react'
import { Funnel } from '@/components/Funnel'
import { downloadBlob } from '@/lib/utils.blob'
import { useBoxesData, useExportData } from '@/hooks/usePopularityAnalytics'
import { formatDateISO } from '@/lib/utils.date'
import { useNotification } from '@/app/providers/notification'
import type { IDateRangeParams } from '@/types/popularity.types'

const Popularity = () => {
  const { showNotification } = useNotification()
  const [isRatingSort, setIsRatingSort] = useState(false)
  const [dateRange, setDateRange] = useState({
    dateFrom: undefined,
    dateTo: undefined
  })

  const [queryParams, setQueryParams] = useState<IDateRangeParams | null>(null)

  const isDateRangeValid = useMemo(() => {
    const { dateFrom, dateTo } = dateRange
    return !!(dateFrom && dateTo && dateFrom <= dateTo)
  }, [dateRange])

  const { data: boxes = [], isLoading } = useBoxesData(queryParams)
  const { data: exportData, isLoading: isLoadingExport } = useExportData(queryParams)

  const handleDateChange = useCallback(
    (field: string) => (date: Date | undefined) => {
      setDateRange(prev => ({
        ...prev,
        [field]: date
      }))
      setQueryParams(null)
    },
    []
  )

  const handleFetchData = useCallback(() => {
    if (isDateRangeValid && dateRange.dateFrom && dateRange.dateTo) {
      setQueryParams({
        dateFrom: formatDateISO(dateRange.dateFrom),
        dateTo: formatDateISO(dateRange.dateTo)
      })
    }
  }, [isDateRangeValid, dateRange])

  const handleDownload = useCallback(() => {
    if (!exportData) {
      showNotification({
        status: 'error',
        message: 'Нет данных для скачивания'
      })
      return
    }
    try {
      downloadBlob(exportData)
      showNotification({
        status: 'success',
        message: 'Скачивание файла'
      })
    } catch {
      showNotification({
        status: 'error',
        message: 'Ошибка скачивания'
      })
    }
  }, [exportData, showNotification])

  return (
    <>
      <div className="bg-white text-text-black-dark p-[18px_20px] rounded-md">
        <h1 className="text-h2">Популярность коробочных решений</h1>
        <p className="text-h3 pt-2">Сравнение посещений за период</p>
        <div className=" grid grid-cols-1 min-[1050px]:grid-cols-[1fr_222px] gap-5 items-end mt-8">
          <div className=" grid grid-cols-1 min-[1050px]:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-grey-medium">Период с</span>
              <CalendarInput variant="single" value={dateRange.dateFrom} onChange={handleDateChange('dateFrom')} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-grey-medium">Период по</span>
              <CalendarInput variant="single" value={dateRange.dateTo} onChange={handleDateChange('dateTo')} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button disabled={!isDateRangeValid || isLoading} className="w-41 h-11.5" onClick={handleFetchData}>
              Показать
            </Button>
            <Button
              disabled={isLoadingExport || !exportData || isLoading}
              variant="secondary"
              className="size-11.5 border-grey-light"
              onClick={handleDownload}
            >
              <DownloadIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white text-text-black-dark p-[18px_20px] my-5 rounded-md">
        <div>
          <Button variant="outline" size="default" className="p-3" onClick={() => setIsRatingSort(prev => !prev)}>
            Рейтинг <ArrowsUpDownIcon />
          </Button>
        </div>
        <div className="mt-8">
          <Funnel sort={isRatingSort} data={boxes} />
        </div>
      </div>
    </>
  )
}

export const Component = Popularity
