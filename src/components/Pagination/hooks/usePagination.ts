import type { IPagination } from '@/pages/BoxSolutions/BoxSolutions.types'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generatePagesRange } from '../helpers/generatePagesRange'
import { getPageHref } from '../helpers/getPageHref'

export const usePagination = (pagination?: IPagination) => {
  const limit = pagination?.limit || 1
  const offset = pagination?.offset || 0
  const total = pagination?.total || 0

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)

  const pagesRange = useMemo(() => generatePagesRange(selectedPage, totalPages || 1), [selectedPage, totalPages])

  const changeLimit = (newLimit: number | undefined) => {
    if (!newLimit) return
    const params = new URLSearchParams(searchParams)
    params.set('limit', newLimit.toString())
    params.set('offset', '0')
    setSearchParams(params)
  }

  const prevLink = selectedPage > 1 ? getPageHref(offset - limit, limit, searchParams) : '#'
  const nextLink = selectedPage < totalPages ? getPageHref(offset + limit, limit, searchParams) : '#'
  const selectedLink = (page: string | number) => getPageHref((Number(page) - 1) * limit, limit, searchParams)

  return {
    prevLink,
    nextLink,
    selectedLink,
    pagesRange,
    selectedPage,
    totalPages,
    changeLimit
  }
}
