import type { ChartData } from '@/components/ui/Chart/Chart.types'
import type { BoxStatsLoadedSeries, BoxStatsTableRow } from '@/pages/Stats/ApplicationsStats/ApplicationStats.types'

function chartSeriesName(item: BoxStatsLoadedSeries) {
  const { dateFrom, dateTo } = item.queryParams
  return `${item.name} · ${dateFrom} — ${dateTo}`
}

export const EMPTY_STATS_TABLE_ROW: BoxStatsTableRow = {
  id: '_',
  name: '',
  period: '',
  records: '',
  visits: ''
}

export function mapLoadedSeriesToTableRows(series: BoxStatsLoadedSeries[]): BoxStatsTableRow[] {
  if (!series.length) return [EMPTY_STATS_TABLE_ROW]

  return series.map(item => ({
    id: item._id,
    name: item.name,
    period: `${item.queryParams.dateFrom} - ${item.queryParams.dateTo}`,
    records: item.data?.reduce((sum, record) => sum + (record.records || 0), 0) || 0,
    visits: item.data?.reduce((sum, record) => sum + (record.visitors || 0), 0) || 0
  }))
}

export function mapLoadedSeriesToChartData(series: BoxStatsLoadedSeries[]): ChartData {
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
