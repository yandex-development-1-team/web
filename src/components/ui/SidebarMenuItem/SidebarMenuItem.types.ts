import type React from 'react'

export interface SidebarMenuItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  route?: string
  onClick?: () => void
  childrenItems?: Omit<SidebarMenuItemProps, 'Icon' | 'isExpanded'>[]
  isExpanded: boolean
}
