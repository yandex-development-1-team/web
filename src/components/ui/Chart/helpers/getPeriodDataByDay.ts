import type { Period } from '@/components/ui/Chart/Chart.types'

export const getPeriodDataByDay = (periods: Period[], dayIndex: number) => {
  return periods.reduce(
    (acc, period) => {
      const data = period.data[dayIndex]
      if (data) {
        acc[period.name] = {
          date: data.date,
          visitors: data.visitors
        }
      }
      return acc
    },
    {} as Record<string, { date: string; visitors: number }>
  )
}
