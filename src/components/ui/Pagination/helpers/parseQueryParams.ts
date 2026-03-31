import { ZodObject, type ZodRawShape } from 'zod'

export const parseQueryParams = <S extends ZodObject<ZodRawShape>>(searchParams: URLSearchParams, schema: S) => {
  const rawParams = Object.fromEntries(searchParams.entries())

  const result = schema.safeParse(rawParams)
  console.log('parseQueryParams result=>>>', { result }) //TODO: console
  if (!result.success) return schema.parse({})

  return result.data
}
