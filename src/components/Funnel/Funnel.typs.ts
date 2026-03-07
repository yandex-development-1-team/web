export interface IFunnel {
  sort: boolean
  data: Items[]
}

type Items = {
  id?: number
  name: string
  views: number
}
