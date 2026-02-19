import type { ComponentProps, ReactNode } from 'react'
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from './ui/InputGroup'
import { InputBasic } from './ui/InputBasic'
import type { ButtonProps } from '@/components/ui/Button'

type IconPosition = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

type BaseInputProps = Omit<ComponentProps<'input'>, 'disabled'> & {
  disabled?: boolean
  invalid?: boolean
  className?: string
}

type TSimpleInputProps = BaseInputProps & {
  variant?: 'text'
}

type TInputWithIconProps = BaseInputProps & {
  variant: 'icon'
  icon: ReactNode
  iconPosition?: IconPosition
}

type TInputWithIconButtonProps = BaseInputProps & {
  variant: 'button'
  onClick: () => void
  buttonarialabel: string
  buttonProps?: Omit<ButtonProps, 'onClick'>
  icon: ReactNode
  iconPosition?: IconPosition
}

type TIconProps = TSimpleInputProps | TInputWithIconProps | TInputWithIconButtonProps

function Input(props: TIconProps) {
  if (props.variant === 'icon') {
    const { icon, iconPosition, invalid, disabled, className, ...otherProps } = props
    return (
      <InputGroup disabled={disabled} aria-invalid={invalid} className={className}>
        <InputGroupInput disabled={disabled} {...otherProps} />
        <InputGroupAddon align={iconPosition}>{icon}</InputGroupAddon>
      </InputGroup>
    )
  }

  if (props.variant === 'button') {
    const { icon, iconPosition, onClick, invalid, disabled, className, ...otherProps } = props
    return (
      <InputGroup disabled={disabled} aria-invalid={invalid} className={className}>
        <InputGroupInput disabled={disabled} {...otherProps} />
        <InputGroupAddon align={iconPosition ?? 'inline-end'}>
          <InputGroupButton type="button" onClick={onClick} aria-label={props.buttonarialabel} {...props.buttonProps}>
            {icon}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    )
  } else {
    return <InputBasic aria-invalid={props.invalid} {...props} />
  }
}

export { Input }
