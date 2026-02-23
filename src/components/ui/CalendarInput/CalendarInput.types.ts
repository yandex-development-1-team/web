import type { DateRange } from 'react-day-picker'

export type TCalendarRangeInputProps = {
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
}

export type TCalendarSingleInputProps = {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
}

export type TCalendarInputProps =
  | ({ variant: 'single' } & TCalendarSingleInputProps)
  | ({ variant: 'range' } & TCalendarRangeInputProps)
