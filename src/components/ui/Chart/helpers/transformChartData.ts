import type { ChartData } from '@/components/ui/Chart/Chart.types'

export const transformChartData = (data: ChartData) => {
  if (!data?.periods) return []

  const maxLength = Math.max(...data.periods.map(p => p.data.length))

  const unifiedData = []

  for (let i = 0; i < maxLength; i++) {
    const dataPoint: { day: number; [key: string]: number | null } = { day: i + 1 }

    data.periods.forEach(period => {
      dataPoint[period.name] = period.data[i]?.visitors || null
    })

    unifiedData.push(dataPoint)
  }

  return unifiedData
}
