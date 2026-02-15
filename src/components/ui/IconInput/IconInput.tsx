import type { ComponentProps, ReactNode } from 'react'
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from './input-group'
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '../button/Button.styles'
import type { Button } from '../button'

type IconPosition = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

type TIconInputProps =
  | ({
      variant: 'icon'
      icon: ReactNode
      iconPosition?: IconPosition
      disabled?: boolean
      invalid?: boolean
      className?: string
    } & Omit<ComponentProps<'input'>, 'disabled' | 'invalid'>)
  | ({
      variant: 'button'
      onClick: () => void
      buttonAriaLabel: string
      buttonProps?: Omit<ComponentProps<typeof Button>, 'size' | 'onClick'> & VariantProps<typeof buttonVariants>
      icon: ReactNode
      iconPosition?: IconPosition
      disabled?: boolean
      invalid?: boolean
      className?: string
    } & Omit<ComponentProps<'input'>, 'disabled' | 'invalid'>)

export function IconInput(props: TIconInputProps) {
  const { variant, icon, iconPosition, disabled, invalid, className, onClick, ...otherProps } = props
  return (
    <InputGroup disabled={disabled} aria-invalid={invalid} className={className}>
      <InputGroupInput disabled={disabled} {...otherProps} />
      {variant === 'icon' ? (
        <InputGroupAddon align={iconPosition}>{icon}</InputGroupAddon>
      ) : (
        <InputGroupAddon align={iconPosition ?? 'inline-end'}>
          <InputGroupButton type="button" onClick={onClick} aria-label={props.buttonAriaLabel} {...props.buttonProps}>
            {icon}
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
