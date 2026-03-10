export const getPageHref = (page: number | string, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams)
  params.set('page', page.toString())
  return `?${params.toString()}`
}
