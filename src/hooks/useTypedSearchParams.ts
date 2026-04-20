import { parseQueryParams } from '@/components/ui/Pagination'
import { useSearchParams } from 'react-router-dom'
import { z, ZodObject, type ZodRawShape } from 'zod'

export const useSelect = <S extends ZodObject<ZodRawShape>>(schema: S) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = parseQueryParams<S>(searchParams, schema) as z.infer<S>

  const setTypedParams = (newParams: Partial<z.infer<S>>) => {
    setSearchParams(prev => {
      const combined = {
        ...Object.fromEntries(prev.entries()),
        ...newParams,
        offset: 0
      }

      return Object.fromEntries(
        Object.entries(combined).filter(([, value]) => {
          return value !== '' && value !== null && value !== 'all' && value !== undefined
        })
      ) as Record<string, string>
    })
  }

  return { params, setTypedParams } as const
}
