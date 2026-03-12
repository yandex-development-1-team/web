import type { BoxSortField, BoxStatus, IParams } from '../Pagination.types'

export const getParams = (searchParams: URLSearchParams): IParams => {
  const limit = Number(searchParams.get('limit')) || 6
  const offset = Number(searchParams.get('offset')) || 0

  const params: IParams = {
    limit: Math.max(limit, 6),
    offset: Math.max(offset, 0)
  }

  const status = searchParams.get('status') as BoxStatus
  if (status) params.status = status

  const search = searchParams.get('search')
  if (search) params.search = search

  const sort = searchParams.get('sort') as BoxSortField
  if (sort) params.sort = sort

  const order = searchParams.get('order') as 'asc' | 'desc'
  if (order) params.order = order

  return params
}
