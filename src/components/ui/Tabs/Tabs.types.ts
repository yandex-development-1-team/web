import type { ComponentProps, FC, SVGProps } from 'react'

export interface ITabs<T> {
  id: string
  path: T
  title: string
  Icon: FC<SVGProps<SVGSVGElement>>
}

export interface ITabsProps<T extends string = string> extends ComponentProps<'div'> {
  tabs: ITabs<T>[]
  activeTab: T
  onTabClick: (path: T) => void
}
