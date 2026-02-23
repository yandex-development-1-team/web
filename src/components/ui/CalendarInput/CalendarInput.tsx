import type { TCalendarInputProps } from './CalendarInput.types'
import { CalendarRangeInput } from './ui/CalendarRangeInput'
import { CalendarSingleInput } from './ui/CalendarSingleInput'

export function CalendarInput(props: TCalendarInputProps) {
  return props.variant === 'single' ? <CalendarSingleInput {...props} /> : <CalendarRangeInput {...props} />
}
