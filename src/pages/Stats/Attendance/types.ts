export interface AttendanceTableRow extends Record<string, unknown> {
  id: string
  // name: string
  period: string
  // records: number | string
  // visits: number | string
  attendance: number
  dynamics: number
}

export interface BoxStatsTableRow extends Record<string, unknown> {
  id: string
  name: string
  period: string
  records: number | string
  visits: number | string
}

export type DateRangeField = 'from' | 'to'

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

export interface AttendanceLoadedSeries extends BoxStatsSeries {
  _id: string
  queryParams: BoxStatsSearchParams
}
export type DateRange = {
  from: Date | undefined
  to?: Date | undefined
}
