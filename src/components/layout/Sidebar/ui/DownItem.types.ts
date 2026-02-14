import type { FC } from 'react'

export interface DownItemProps {
  Icon: FC<React.SVGProps<SVGSVGElement>>
  title: string
  route?: string
  onClick?: () => void
  isExpanded: boolean
}
