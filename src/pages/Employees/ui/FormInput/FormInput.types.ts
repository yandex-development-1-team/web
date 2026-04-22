import type { ReactNode } from 'react'

export type FormInputType = {
  label: string
  labelClassName?: string
  input: ReactNode
  errorMessage?: string
}
