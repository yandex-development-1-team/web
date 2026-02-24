import type { IFunnel } from '@/components/Funnel/Funnel.typs'
import { cn } from '@/lib/utils.clsx'
import { useMemo } from 'react'

const STEP_WIDTH_PX = 70
const WIDTH_STEPS_PERCENT = [100, 75, 50, 25]

const initialState = [
  { id: 1, name: 'Название коробки', views: 0 },
  { id: 2, name: 'Название коробки', views: 0 },
  { id: 3, name: 'Название коробки', views: 0 },
  { id: 4, name: 'Название коробки', views: 0 }
]

export const Funnel = (props: IFunnel) => {
  const { sort, data } = props

  const sortedBoxes = useMemo(() => {
    if (data.length == 0) return initialState
    return [...data].sort((a, b) => (sort ? a.views - b.views : b.views - a.views))
  }, [sort, data])

  const totalViews = useMemo(() => sortedBoxes.reduce((acc, item) => acc + item.views, 0), [sortedBoxes])

  const viewPercentages = useMemo(() => {
    if (totalViews == 0) return []
    return sortedBoxes.map(item => ((item.views / totalViews) * 100).toFixed())
  }, [sortedBoxes, totalViews])

  const getColorClass = (index: number, arrayLength: number) => {
    const colorIndex = sort ? arrayLength - 1 - index : index
    const colorClasses = {
      0: 'bg-rating-first',
      1: 'bg-rating-second',
      2: 'bg-rating-third',
      3: 'bg-rating-fourth'
    }

    return colorClasses[colorIndex as keyof typeof colorClasses] || 'bg-rating-first'
  }

  const getWidth = (index: number, arrayLength: number) => {
    const widthIndex = sort ? arrayLength - 1 - index : index
    return `${WIDTH_STEPS_PERCENT[widthIndex] || 100}%`
  }

  const getClipPath = (index: number, arrayLength: number) => {
    const isFirst = index === 0
    const isLast = index === arrayLength - 1

    if (sort) {
      if (isFirst) {
        return 'polygon(50% 0%, 0% 100%, 100% 100%)'
      } else {
        return `polygon(${STEP_WIDTH_PX}px 0%, 0% 100%, 100% 100%, calc(100% - ${STEP_WIDTH_PX}px) 0%)`
      }
    } else {
      if (isLast) {
        return 'polygon(50% 100%, 0% 0%, 100% 0%)'
      } else {
        return `polygon(${STEP_WIDTH_PX}px 100%, 0% 0%, 100% 0%, calc(100% - ${STEP_WIDTH_PX}px) 100%)`
      }
    }
  }

  const getHeight = (index: number, arrayLength: number) => {
    const isLast = index === arrayLength - 1
    const isFirst = index === 0

    if (sort) {
      return isFirst ? 'h-25' : 'h-21'
    } else {
      return isLast ? 'h-25' : 'h-21'
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6.75 max-w-172 mx-auto">
        {sortedBoxes.map((item, index, array) => {
          const colorClass = getColorClass(index, array.length)
          const heightClass = getHeight(index, array.length)
          const width = getWidth(index, array.length)

          return (
            <span
              key={item.id}
              className={cn(colorClass, heightClass, 'flex items-center justify-center text-white')}
              style={{
                width,
                clipPath: getClipPath(index, array.length),
                WebkitClipPath: getClipPath(index, array.length)
              }}
            >
              {viewPercentages?.length ? `${viewPercentages[index]}%` : ''}
            </span>
          )
        })}
      </div>

      <div className="mt-14">
        <ul className="grid grid-cols-1 gap-x-23 gap-y-3 justify-start w-full md:grid-cols-2 md:max-w-[60%] max-w-full">
          {sortedBoxes.map((item, index) => {
            const colorClass = getColorClass(index, sortedBoxes.length)

            return (
              <li key={item.id} className="flex items-center gap-3">
                <span className={cn('w-full max-w-10 h-10 block rounded-lg shrink-0', colorClass)} />
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
