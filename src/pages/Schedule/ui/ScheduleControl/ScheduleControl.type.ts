export type TScheduleControl = {
  options: { label: string; value: string; active: boolean }[]
  onSelect: (value: string) => void
  onToggle: (side: 'left' | 'right') => void
}
