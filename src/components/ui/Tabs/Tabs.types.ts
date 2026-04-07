import type { ComponentProps, FC, SVGProps } from 'react'

export interface ITab<T extends string> {
  id: string
  path: T
  title: string
  Icon: FC<SVGProps<SVGSVGElement>>
}

export type TabsPropsType<T extends string> = {
  readonly tabs: readonly ITab<T>[]
  activeTab: ITab<T>['path']
  onTabClick: (path: ITab<T>['path']) => void
} & ComponentProps<'div'>
