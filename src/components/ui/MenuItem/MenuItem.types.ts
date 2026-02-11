import type React from 'react'

export interface MenuItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  route: string
  childrenItems?: Omit<MenuItemProps, 'Icon'>[]
  isExpanded: boolean
}
