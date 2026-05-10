import type { ChartData } from '@/components/ui/Chart/Chart.types'
import type { AttendanceLoadedSeries, AttendanceTableRow } from '../types'

function chartSeriesName(item: AttendanceLoadedSeries) {
  const { dateFrom, dateTo } = item.queryParams
  return `${item.name} · ${dateFrom} — ${dateTo}`
}

export const EMPTY_STATS_TABLE_ROW: AttendanceTableRow = {
  id: '_',
  period: '',
  attendance: 0,
  dynamics: 0
}

export function mapLoadedSeriesToTableRows(series: AttendanceLoadedSeries[]): AttendanceTableRow[] {
  if (!series.length) return [EMPTY_STATS_TABLE_ROW]

  return series.map(item => {
    const total = item.data?.reduce((sum, record) => sum + (record.visitors | 0), 0)
    const averageVisits = item.data?.length ? Math.round(total / item.data?.length) : 0

    console.log('series', series, 'total:', total, ' averageVisits:', averageVisits)

    return {
      id: item._id,
      name: item.name,
      period: `${item.queryParams.dateFrom} - ${item.queryParams.dateTo}`,
      attendance: averageVisits,
      dynamics: 0
    }
  })
}

export function mapLoadedSeriesToChartData(series: AttendanceLoadedSeries[]): ChartData {
  if (!series.length) {
    return { periods: [] }
  }

  return {
    periods: series.map((item, index) => ({
      id: index,
      name: chartSeriesName(item),
      data: item.data.map(point => ({
        date: point.date,
        visitors: point.visitors
      }))
    }))
  }
}
