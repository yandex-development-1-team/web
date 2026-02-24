import { DownloadIcon, ArrowsUpDownIcon } from '@/assets/icons'
import { Button, CalendarInput } from '@/components/ui'
import { useCallback, useEffect, useState } from 'react'
import { MOCK_BOXES } from '@/mockData/mockBoxes'
import type { TBoxes } from '@/pages/Stats/Popularity/Popularity.types'
import { useNotification } from '@/app/providers/notification'
import { Funnel } from '@/components/Funnel'

const Popularity = () => {
  const [boxes, setBoxes] = useState<TBoxes[]>([])
  const [isRatingSort, setIsRatingSort] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined
  })
  const notification = useNotification()
  const [isDateRangeValid, setIsDateRangeValid] = useState(false)
  const [canDownload, setCanDownload] = useState(false)

  const handleDateChange = useCallback(
    (field: string) => (date: Date | undefined) => {
      setDateRange(prev => ({
        ...prev,
        [field]: date
      }))
    },
    []
  )

  useEffect(() => {
    if (dateRange.endDate && dateRange.startDate) {
      if (dateRange.startDate < dateRange.endDate) {
        setIsDateRangeValid(true)
      } else {
        setIsDateRangeValid(false)
      }
    } else {
      setIsDateRangeValid(false)
    }
    setCanDownload(false)
  }, [dateRange])

  // TODO: Заменить моковыйе данные когда будет бэк
  const handleFetchData = async () => {
    console.log(dateRange)
    try {
      setIsDateRangeValid(false)
      setCanDownload(false)

      const result = await new Promise<TBoxes[]>(resolve => {
        setTimeout(() => {
          const data = [...MOCK_BOXES].sort((a, b) => b.views - a.views).slice(0, 4)
          resolve(data)
        }, 3000)
      })

      setBoxes(result)
      setIsDateRangeValid(true)
      setCanDownload(true)
    } catch (error) {
      setIsDateRangeValid(true)
      setCanDownload(false)
      setBoxes([])

      const errorMessage = error instanceof Error ? error.message : 'Ошибка при загрузке данных'

      notification.showNotification({
        status: 'error',
        message: errorMessage
      })
    }
  }

  // TODO: Скачивание либо через бэк либо самим (оставить на потом)
  const handleDownload = async () => {
    try {
      const queryParams = new URLSearchParams({
        type: 'boxes',
        date_from: dateRange?.startDate || '',
        date_to: dateRange?.endDate || ''
      })
      const response = await fetch(`/api/v1/analytics/export?${queryParams}`)

      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const fileName = url.split('/').pop()
      const link = document.createElement('a')
      link.href = url
      link.download = `${fileName}`
      link.click()
      window.URL.revokeObjectURL(url)
      notification.showNotification({ status: 'success', message: 'Файл готов' })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при загрузке данных'
      notification.showNotification({ status: 'error', message: errorMessage })
    }
  }

  return (
    <>
      <div className="bg-white text-text-black-dark p-[18px_20px] rounded-md">
        <h1 className="text-h2">Популярность коробочных решений</h1>
        <p className="text-h3 pt-2">Сравнение посещений за период</p>
        <div className=" grid grid-cols-1 min-[1050px]:grid-cols-[1fr_222px] gap-5 items-end mt-8">
          <div className=" grid grid-cols-1 min-[1050px]:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-[#6E6E6E]">Период с</span>
              <CalendarInput variant="single" value={dateRange.startDate} onChange={handleDateChange('startDate')} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-[#6E6E6E]">Период по</span>
              <CalendarInput variant="single" value={dateRange.endDate} onChange={handleDateChange('endDate')} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button disabled={!isDateRangeValid} className="w-41 h-11.5" onClick={handleFetchData}>
              Показать
            </Button>
            <Button
              disabled={!canDownload}
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
