export type ToggleButtonState = 'left' | 'right'

export interface ToggleButtonProps {
  leftLabel: string
  rightLabel: string
  onToggle: (selectedSide: ToggleButtonState) => void
  className?: string
}
