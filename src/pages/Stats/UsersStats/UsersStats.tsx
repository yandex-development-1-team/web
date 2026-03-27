import { DownloadIcon } from '@/assets/icons'
import { Button, CalendarInput } from '@/components/ui'
import { useMemo, useState, useCallback } from 'react'
import { downloadBlob } from '@/lib/utils.blob'
import { useUsersData, useExportUsers } from '@/hooks/usersAnalytics'
import { formatDateISO } from '@/lib/utils.date'
import { indicators } from './usersStatsData'
import { useNotification } from '@/app/providers/notification'
import type { IDateRangeParams } from '@/types/popularity.types'
import { mockUsersIndicatorsValues } from '@/mockData/mockUsersStatsPageData'
import { UsersTable } from '@/pages/Stats/UsersStats/ui/UsersTable'

const UsersStats = () => {
  const { showNotification } = useNotification()
  const [dateRange, setDateRange] = useState({
    dateFrom: undefined,
    dateTo: undefined
  })

  const [queryParams, setQueryParams] = useState<IDateRangeParams | null>(null)

  const isDateRangeValid = useMemo(() => {
    const { dateFrom, dateTo } = dateRange
    return !!(dateFrom && dateTo && dateFrom <= dateTo)
  }, [dateRange])

  const { data: users = [], isLoading } = useUsersData(queryParams)
  const { data: exportData, isLoading: isLoadingExport } = useExportUsers(queryParams)

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
      <div className="bg-white text-text-black-dark px-[20px] pb-[20px] rounded-[8px]">
        <h2 className="text-h2 py-[18px_13px]">Аналитика пользователей</h2>
        <h4 className="text-h4sb pb-[14px]">Сводка</h4>
        <div className="flex text-text gap-[20px]">
          {indicators.map(indicator => (
            <div className="flex-1" key={indicator.id}>
              <p className="text-xxs pb-[7px]">{indicator.name}</p>
              <div
                className={`
                border-1 border-grey-light rounded-[8px] text-indicator text-center py-[30px]
                ${indicator.warningColor && 'text-text-error'}
              `}
              >
                {mockUsersIndicatorsValues.find(el => el.id === indicator.id)?.value || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols gap-[34px] bg-white text-text-black-dark px-[20px] mt-[20px] rounded-[8px]">
        <div className=" grid grid-cols-1 min-[500px]:grid-cols-[448px_1fr] gap-3 items-end mt-[18px]">
          <div className=" grid grid-cols-1 min-[500px]:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-text-grey-medium">Период с</span>
              <CalendarInput variant="single" value={dateRange.dateFrom} onChange={handleDateChange('dateFrom')} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-text-grey-medium">Период по</span>
              <CalendarInput variant="single" value={dateRange.dateTo} onChange={handleDateChange('dateTo')} />
            </div>
          </div>
          <div className="flex gap-4">
            <Button disabled={!isDateRangeValid || isLoading} className="w-41 h-11.5" onClick={handleFetchData}>
              Выбрать
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
        <UsersTable data={users} />
      </div>
    </>
  )
}

export const Component = UsersStats
