export interface ButtonProps {
  label?: string
  onClick?: () => void
  style?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children?: React.ReactNode
}
