import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generatePagesRange } from '../helpers/generatePagesRange'
import { getPageHref } from '../helpers/getPageHref'
import type { IPagination } from '../Pagination.types'

export const usePaginationNav = (pagination?: IPagination) => {
  const [searchParams] = useSearchParams()

  const { limit = 6, offset = 0, total = 0 } = pagination || {}

  const selectedPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)
  const pagesRange = useMemo(() => generatePagesRange(selectedPage, totalPages || 1), [selectedPage, totalPages])

  const nav = {
    prev: selectedPage > 1 ? getPageHref(offset - limit, limit, searchParams) : '#',
    next: selectedPage < totalPages ? getPageHref(offset + limit, limit, searchParams) : '#',
    current: (page: string | number) => getPageHref((Number(page) - 1) * limit, limit, searchParams)
  }
  return {
    nav,
    pagesRange,
    selectedPage,
    totalPages
  }
}
