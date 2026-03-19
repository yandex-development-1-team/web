export type TEvent = {
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

export interface IEventsParams {
  box_id?: number
  date_from?: string
  date_to?: string
  status?: string
  limit?: number
  offset?: number
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
