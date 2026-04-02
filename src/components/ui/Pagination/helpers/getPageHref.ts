export const getPageHref = (offset: number | string, limit: number, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams)

  if (offset) {
    params.set('offset', offset.toString())
  } else {
    params.delete('offset')
  }

  if (limit) {
    params.set('limit', limit.toString())
  }

  return `?${params.toString()}`
}
