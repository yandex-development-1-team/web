import type { IPagination } from '@/pages/BoxSolutions/BoxSolutions.types'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generatePagesRange } from '../helpers/generatePagesRange'
import { getPageHref } from '../helpers/getPageHref'

export const usePagination = (pagination?: IPagination) => {
  const limit = pagination?.limit || 1
  const offset = pagination?.offset || 0
  const total = pagination?.total || 0

  const [searchParams] = useSearchParams()

  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)

  const pages = useMemo(() => generatePagesRange(currentPage, totalPages || 1), [currentPage, totalPages])

  const prevPageLink = currentPage > 1 ? getPageHref(currentPage - 1, searchParams) : '#'
  const nextPageLink = currentPage < totalPages ? getPageHref(currentPage + 1, searchParams) : '#'
  const selectedPageLink = (page: string | number) => getPageHref(page, searchParams)

  return {
    prevPageLink,
    nextPageLink,
    selectedPageLink,
    searchParams,
    pages,
    currentPage,
    totalPages
  }
}
