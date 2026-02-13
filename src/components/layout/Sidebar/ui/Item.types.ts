import type React from 'react'

export interface ItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  route: string
  childrenItems?: Omit<ItemProps, 'Icon' | 'isExpanded'>[]
  isExpanded: boolean
}
