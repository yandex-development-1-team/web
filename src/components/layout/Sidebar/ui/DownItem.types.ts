import type React from 'react'

export interface DownItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  route?: string
  onClick?: () => void
  isExpanded: boolean
}
