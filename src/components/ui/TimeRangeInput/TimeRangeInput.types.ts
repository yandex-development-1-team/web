import type { TimeRange } from '@/lib/utils.time'

export type TimeRangeInputType = {
  value?: TimeRange
  onChange?: (value: TimeRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
}
