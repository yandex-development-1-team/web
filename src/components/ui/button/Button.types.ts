import type { ComponentProps } from 'react'
import type { buttonVariants } from './Button.styles'
import type { VariantProps } from 'class-variance-authority'

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  label?: string
  asChild?: boolean
}
