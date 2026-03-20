import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generatePagesRange } from '../helpers/generatePagesRange'
import { getPageHref } from '../helpers/getPageHref'
import type { IPagination } from '../Pagination.types'

export const usePaginationNav = (pagination?: IPagination) => {
  const [searchParams] = useSearchParams()

  const limit = pagination?.limit || 1
  const offset = pagination?.offset || 0
  const total = pagination?.total || 0

  const selectedPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)
  const pagesRange = useMemo(() => generatePagesRange(selectedPage, totalPages || 1), [selectedPage, totalPages])

  const prev = selectedPage > 1 ? getPageHref(offset - limit, limit, searchParams) : '#'
  const next = selectedPage < totalPages ? getPageHref(offset + limit, limit, searchParams) : '#'
  const current = (page: string | number) => getPageHref((Number(page) - 1) * limit, limit, searchParams)

  return {
    prev,
    next,
    current,
    pagesRange,
    selectedPage,
    totalPages
  }
}
