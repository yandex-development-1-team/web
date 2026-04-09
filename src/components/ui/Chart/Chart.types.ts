export interface DataPoint {
  date: string
  visitors: number
}

export interface Period {
  id: number
  name: string
  data: DataPoint[]
}

export interface ChartData {
  periods: Period[]
}

export interface TooltipPayload {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
    dataKey: string
  }>
  label?: string | number
}

export interface ChartProps {
  data: ChartData
  height?: number
  label?: string
  colors?: string[]
}
