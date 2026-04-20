import { formatDateISO } from '@/lib/utils.date'
import type { IEventsParams } from '@/types/schedule.types'
import { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useEventParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo((): IEventsParams => {
    const limit = searchParams.get('limit')
    const date_from = searchParams.get('date_from')

    return {
      limit: limit ? Number(limit) : 5,
      date_from: date_from || formatDateISO(new Date())
    }
  }, [searchParams])

  const setDate = useCallback(
    (date: Date) => {
      setSearchParams(prevParams => {
        const currentLimit = prevParams.get('limit')

        const newParams = new URLSearchParams()
        newParams.set('limit', currentLimit || '5')
        newParams.set('date_from', formatDateISO(date))

        return newParams
      })
    },
    [setSearchParams]
  )

  return {
    params,
    setDate
  }
}
