import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generatePagesRange } from '../helpers/generatePagesRange'

const getPageHref = (page: number | string, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams)
  params.set('page', page.toString())
  return `?${params.toString()}`
}

export const usePagination = (currentPage: number, totalPages: number) => {
  const [searchParams] = useSearchParams()

  const pagesRange = useMemo(() => generatePagesRange(currentPage, totalPages || 1), [currentPage, totalPages])
  const prevPage = currentPage > 1 ? getPageHref(currentPage - 1, searchParams) : '#'
  const nextPage = currentPage < totalPages ? getPageHref(currentPage + 1, searchParams) : '#'
  const selectedPage = (page: string | number) => getPageHref(page, searchParams)

  return {
    prevPage,
    nextPage,
    searchParams,
    pagesRange,
    selectedPage
  }
}
