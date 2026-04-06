import type { Period, TooltipPayload } from '@/components/ui/Chart/Chart.types'
import { getPeriodDataByDay } from '@/components/ui/Chart/helpers/getPeriodDataByDay'

interface ChartTooltipProps extends TooltipPayload {
  periods: Period[]
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, periods }) => {
  if (!active || !payload || !payload.length) return null
  const dayIndex = parseInt(label as string) - 1
  const periodData = getPeriodDataByDay(periods, dayIndex)

  return (
    <div className="bg-white p-3 border border-grey-border rounded-lg shadow-md min-w-55">
      {payload.map((entry, index) => {
        const data = periodData[entry.name]
        if (!data) return null

        return (
          <div
            key={index}
            className={`py-1 ${index !== payload.length - 1 ? 'border-b border-grey-extra-light mb-2' : ''}`}
          >
            <div>
              <span style={{ color: entry.color }} className="font-bold text-h5 text-center ">
                {entry.name}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2.5">
              <span className="font-medium text-xs  text-text-black-dark">{data.date}</span>
              <span className="font-bold text-xs text-text-black-dark">{entry.value}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
