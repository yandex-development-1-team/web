interface IClient {
  name: string
  organization?: string
  telegram?: string
  position?: string
}

interface IReservation {
  date?: string
  time?: string
}

interface IManager {
  name: string
  photo?: string
}

export type TApplicationStatus = 'В работе' | 'В очереди' | 'Готово'

interface IApplicationProcessing {
  manager?: IManager
  boxName?: string
  status: TApplicationStatus
  applicationDate?: string
}

export interface IBoxApplication {
  id: string | number
  client?: IClient
  reservation?: IReservation
  processing: IApplicationProcessing
}
