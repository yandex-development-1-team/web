export type TTableEvent = {
  id: number
  box_id: number
  box_name: string
  date: string
  time: string
  total_slots: number
  occupied_slots: number
  available_slots: number
  location: string
  status: string
}

export type TEvent = {
  id: number
  box_id: number
  box_name: string
  date: string
  time: TimeRange
  total_slots: number
  occupied_slots: number
  available_slots: number
  location: string
  status: string
}

export interface TimeRange {
  from?: string
  to?: string
}

export interface IEventsParams {
  date_from: string
  limit: number
}

export interface IPagination {
  limit: number
  offset: number
  total: number
}

export interface IEventsResponse {
  items: TEvent[]
  pagination: IPagination
}
