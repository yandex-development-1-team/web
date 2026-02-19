import type { FC } from 'react'

export interface ItemProps {
  Icon: FC<React.SVGProps<SVGSVGElement>>
  title: string
  route: string
  childrenItems?: Omit<ItemProps, 'Icon' | 'isExpanded'>[]
  isExpanded: boolean
}
