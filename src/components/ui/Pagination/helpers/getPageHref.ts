export const getPageHref = (offset: number | string, limit: number, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams)

  params.set('offset', offset.toString())

  if (limit) {
    params.set('limit', limit.toString())
  }

  return `?${params.toString()}`
}
