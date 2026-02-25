import { DownloadIcon, ArrowsUpDownIcon } from '@/assets/icons'
import { Button, CalendarInput } from '@/components/ui'
import { useMemo, useState } from 'react'
import type { TBoxes } from '@/pages/Stats/Popularity/Popularity.types'
import { Funnel } from '@/components/Funnel'
import { downloadBlob } from '@/lib/utils.blob'
import { useExportAnalytics, useGetBoxes } from '@/hooks/usePopularityAnalytics'

const Popularity = () => {
  const [boxes, setBoxes] = useState<TBoxes[]>([])
  const [isRatingSort, setIsRatingSort] = useState(false)
  const [dateRange, setDateRange] = useState({
    dateFrom: undefined,
    dateTo: undefined
  })

  const [canDownload, setCanDownload] = useState(false)

  const exportFile = useExportAnalytics()
  const resp = useGetBoxes()

  const queryParams = {
    dateFrom: dateRange.dateFrom || '',
    dateTo: dateRange.dateTo || ''
  }

  const isDateRangeValid = useMemo(() => {
    const { dateFrom, dateTo } = dateRange
    return !!(dateFrom && dateTo && dateFrom <= dateTo)
  }, [dateRange])

  const handleDateChange = (field: string) => (date: Date | undefined) => {
    setDateRange(prev => ({
      ...prev,
      [field]: date
    }))
    setCanDownload(false)
  }

  const handleFetchData = async () => {
    try {
      const result = await resp.mutateAsync(queryParams)
      setBoxes(result.data)
      setCanDownload(true)
    } catch (error) {
      setBoxes([])
      setCanDownload(false)
      console.error('Ошибка при загрузке данных:', error)
    }
  }

  const handleDownload = async () => {
    const response = await exportFile.mutateAsync(queryParams)
    const blob = response.blob.data
    downloadBlob(blob)
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
              <CalendarInput variant="single" value={dateRange.dateFrom} onChange={handleDateChange('dateFrom')} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xxs text-[#6E6E6E]">Период по</span>
              <CalendarInput variant="single" value={dateRange.dateTo} onChange={handleDateChange('dateTo')} />
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
