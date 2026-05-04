export interface BoxStatsTableRow extends Record<string, unknown> {
  id: string
  name: string
  period: string
  records: number | string
  visits: number | string
}

export type DateRangeField = 'dateFrom' | 'dateTo'

export type BoxNameList = string[]

export interface BoxStatsSearchParams {
  dateFrom: string
  dateTo: string
  search: string
}

export interface BoxStatsDataPoint {
  date: string
  records: number
  visitors: number
}

export interface BoxStatsSeries {
  id: number
  name: string
  data: BoxStatsDataPoint[]
}

export interface BoxStatsApiResponse {
  periods: BoxStatsSeries[]
}

export interface BoxStatsLoadedSeries extends BoxStatsSeries {
  _id: string
  queryParams: BoxStatsSearchParams
}
