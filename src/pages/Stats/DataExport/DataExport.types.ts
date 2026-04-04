import type { ComponentProps } from 'react'

export type TPath = 'employees' | 'attendance' | 'boxes' | 'users'

// export interface ITabsProps extends ComponentProps<'div'> {
//   tabs: ITab<TPath>[]
//   activeTab: string
//   onTabClick: (path: TPath) => void
// }

export type TFile = {
  id: string
  name: string
  size: number
}

export interface IFileItem extends ComponentProps<'li'> {
  file: TFile
  onDelete?: (id: string) => void
}

export type FileUploaderPropsType = {
  files: TFile[] | undefined
  isPending: boolean
  onDelete?: (id: string) => void
} & ComponentProps<'ul'>
