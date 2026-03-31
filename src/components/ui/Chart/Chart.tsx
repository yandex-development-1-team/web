import { ChartTooltip, type ChartProps } from '@/components/ui/Chart'
import { generateRandomColor } from '@/components/ui/Chart/helpers/generateRandomColor'
import { transformChartData } from '@/components/ui/Chart/helpers/transformChartData'
import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

export const Chart: React.FC<ChartProps> = ({ data, height = 400, label = 'Динамика посещаемости', colors }) => {
  const chartData = useMemo(() => transformChartData(data!), [data])

  const periodColors = useMemo(() => {
    if (!data?.periods) return {}

    return data.periods.reduce(
      (acc, period, index) => {
        acc[period.id] = generateRandomColor(index, colors)
        return acc
      },
      {} as Record<string, string>
    )
  }, [data, colors])

  const maxDay = chartData[chartData.length - 1]?.day || 0

  if (!data?.periods?.length) {
    return <div className="text-center py-12.5">Нет данных для отображения</div>
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} accessibilityLayer={false}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F3F3" />

        <ReferenceLine x={maxDay} stroke="#F3F3F3" strokeWidth={1} strokeDasharray="3 3" />

        <XAxis
          dataKey="day"
          axisLine={false}
          tick={false}
          label={{
            value: label,
            position: 'insideBottomLeft',
            fill: '#353434',
            className: 'text-xs font-normal'
          }}
        />

        <YAxis
          strokeDasharray={3}
          tick={{ fontSize: 14, fill: '#353434' }}
          domain={[0, 'auto']}
          tickLine={false}
          stroke="#F3F3F3"
        />

        {data.periods.map(period => (
          <Line
            key={period.id}
            type="linear"
            dataKey={period.name}
            stroke={periodColors[period.id]}
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        ))}

        <Tooltip content={<ChartTooltip periods={data.periods} />} />
      </LineChart>
    </ResponsiveContainer>
  )
}
