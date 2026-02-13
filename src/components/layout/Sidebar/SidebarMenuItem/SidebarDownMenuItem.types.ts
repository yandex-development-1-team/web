import type React from 'react'

export interface SidebarDownMenuItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  route?: string
  onClick?: () => void
  isExpanded: boolean
}
