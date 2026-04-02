import type { ComponentProps } from 'react'

export interface IPagination {
  limit: number
  offset: number
  total: number
}

export type PaginationProps = {
  pagination?: IPagination | undefined
  variant?: 'default' | 'limit' | 'nav'
} & ComponentProps<'div'>
