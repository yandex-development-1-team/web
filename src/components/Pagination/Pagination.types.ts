export type BoxStatus = 'active' | 'disable'
export type BoxSortField = 'name' | 'created_at' | 'updated_at'
export interface IParams {
  offset: number
  limit: number
  status?: BoxStatus
  search?: string
  sort?: BoxSortField
  order?: 'asc' | 'desc'
}
