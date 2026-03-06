import type { ComponentProps } from 'react'

interface DetailItem {
  label: string
  value: string
}

type DetailSectionType = {
  title: string
  items: DetailItem[]
} & ComponentProps<'div'>

export const DetailSection = ({ className, items, title }: DetailSectionType) => {
  return (
    <div className={className}>
      <h4 className="text-h4sb">{title}</h4>
      <div className="flex flex-col justify-center gap-2 mt-3">
        {items.map((item, index) => {
          return (
            <div className="flex gap-5" key={index}>
              <p className="w-46">{item.label}</p>
              <p>{item.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
