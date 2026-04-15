import { parseQueryParams } from '@/components/ui/Pagination'
import { useCallback, useEffect, useRef, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { z, ZodObject, ZodRawShape } from 'zod'

export const useUrlFilters = <S extends ZodObject<ZodRawShape>>(schema: S) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const timer = timeoutRef.current
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  const params = parseQueryParams(searchParams, schema)

  const updateOnSelectParams = useCallback(
    (key: keyof z.infer<S>) => {
      return (value: string) => {
        setSearchParams(prev => {
          const combineParams = { ...Object.fromEntries(prev.entries()), ...{ [key]: value } }

          const cleanParams = Object.fromEntries(
            Object.entries(combineParams).filter(
              ([, value]) => value !== '' && value !== 'all' && value !== null && value !== undefined
            )
          )

          return { ...cleanParams, offset: '0' }
        })
      }
    },
    [setSearchParams]
  )

  const updateOnSearchParams = useCallback(
    (key: keyof z.infer<S>) => {
      return (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = e.currentTarget.value

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          updateOnSelectParams(key)(value)
        }, 500)
      }
    },
    [updateOnSelectParams]
  )

  return { params, updateOnSelectParams, updateOnSearchParams } as const
}
