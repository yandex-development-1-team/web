import { type ZodObject, type ZodRawShape, z } from 'zod'

export const parseQueryParams = <S extends ZodObject<ZodRawShape>>(
  searchParams: URLSearchParams,
  schema: S
): z.infer<S> => {
  const rawParams = Object.fromEntries(searchParams.entries())

  const result = schema.safeParse(rawParams)

  if (!result.success) return schema.parse({})

  return result.data
}
