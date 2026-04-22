import { getBoxStats } from '@/pages/Stats/ApplicationsStats/api/getBoxStats'
import type { BoxStatsLoadedSeries, BoxStatsSearchParams } from '@/pages/Stats/ApplicationsStats/ApplicationStats.types'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export const useBoxStats = () => {
  const [loadedSeries, setLoadedSeries] = useState<BoxStatsLoadedSeries[]>([])

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (params: BoxStatsSearchParams) => {
      const response = await getBoxStats(params)
      return { data: response, params }
    },
    onSuccess: ({ data, params }) => {
      if (!data?.periods?.length) return

      setLoadedSeries(prev => {
        const isDuplicate = prev.some(
          existing =>
            existing.queryParams.dateFrom === params.dateFrom &&
            existing.queryParams.dateTo === params.dateTo &&
            existing.queryParams.search === params.search
        )
        if (isDuplicate) return prev

        const next: BoxStatsLoadedSeries[] = data.periods.map(period => ({
          ...period,
          _id: `${params.dateFrom}_${params.dateTo}_${params.search}_${period.id}_${Date.now()}`,
          queryParams: { ...params }
        }))

        return [...prev, ...next]
      })
    },
    onError: err => {
      console.error('Ошибка при получении данных:', err)
    }
  })

  const removeSeries = useCallback((id: string) => {
    setLoadedSeries(prev => prev.filter(item => item._id !== id))
  }, [])

  const clearSeries = useCallback(() => {
    setLoadedSeries([])
  }, [])

  return {
    loadedSeries,
    appendSeries: mutate,
    isAppending: isPending,
    isError,
    error,
    removeSeries,
    clearSeries
  }
}
