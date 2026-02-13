export type ButtonState = 'left' | 'right'

export interface ToggleButtonProps {
  leftLabel: string
  rightLabel: string
  onToggle: (selectedSide: ButtonState) => void
  className?: string
}
