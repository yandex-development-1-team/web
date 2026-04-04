import { paramsSchema, type IParams } from '../Pagination.types'

export const parseQueryParams = (searchParams: URLSearchParams): IParams => {
  const rawParams = Object.fromEntries(searchParams.entries())

  const result = paramsSchema.safeParse(rawParams)

  if (!result.success) return paramsSchema.parse({})

  return result.data
}
