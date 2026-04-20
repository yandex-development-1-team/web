import type { FC } from 'react'

export type CardLinkType = {
  to: string
  icon: FC<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  detailsLabel?: string
  iconSize?: number
}
