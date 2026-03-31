import type { ComponentProps, FC, SVGProps } from 'react'

export interface ITab {
  id: string
  path: string
  title: string
  Icon: FC<SVGProps<SVGSVGElement>>
}

export interface ITabsProps extends ComponentProps<'div'> {
  readonly tabs: readonly ITab[]
  activeTab: ITab['path']
  onTabClick: (path: ITab['path']) => void
}
