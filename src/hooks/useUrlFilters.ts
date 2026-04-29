import { parseQueryParams } from '@/components/ui/Pagination'
import { useCallback, useRef, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { z, ZodObject, ZodRawShape } from 'zod'

export const useQueryParams = <S extends ZodObject<ZodRawShape>>(schema: S) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const params = parseQueryParams(searchParams, schema)

  const updateParam = useCallback(
    (key: keyof z.infer<S>) => {
      return (value: string) => {
        setSearchParams(prev => {
          const combineParams = { ...Object.fromEntries(prev.entries()), ...{ [key]: value }, offset: '0' }

          const cleanParams = Object.fromEntries(
            Object.entries(combineParams).filter(
              ([, value]) => value !== '' && value !== '0' && value !== 'all' && value !== null && value !== undefined
            )
          )

          return { ...cleanParams }
        })
      }
    },
    [setSearchParams]
  )

  const updateParamDebounced = useCallback(
    (key: keyof z.infer<S>) => {
      return (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = e.currentTarget.value

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          updateParam(key)(value)
        }, 300)
      }
    },
    [updateParam]
  )

  return { params, updateParam, updateParamDebounced } as const
}
