export interface IUsersStats {
  id: number
  name: string
  recordsCount: number
  visitFrequency: number
  boxes: string
  cancellations: number
  [key: string]: string | number
}

export interface IDateRangeParams {
  dateFrom: string
  dateTo: string
}

export type ExportData = Blob
