import type { ComponentProps, ReactNode } from 'react'
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from './input-group'
import type { ButtonProps } from '../button/Button.types'

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
      buttonarialabel: string
      buttonProps?: Omit<ButtonProps, 'onClick'>
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
          <InputGroupButton type="button" onClick={onClick} aria-label={props.buttonarialabel} {...props.buttonProps}>
            {icon}
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
