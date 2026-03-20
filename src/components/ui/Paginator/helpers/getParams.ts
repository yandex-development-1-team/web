import { paramsSchema, type IParams } from '../Pagination.types'

export const getParams = (searchParams: URLSearchParams): IParams => {
  const rawParams = Object.fromEntries(searchParams.entries())

  const result = paramsSchema.safeParse(rawParams)

  return result.success ? result.data : paramsSchema.parse({})
}
