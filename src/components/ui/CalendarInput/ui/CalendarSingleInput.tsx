import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { Calendar, CustomCalendarDropdown } from './Calendar'
import { CalendarIcon } from '@/assets/icons'
import { formatDate, parseToDate } from '@/lib/utils.date'
import type { TCalendarSingleInputProps } from '../CalendarInput.types'

export const CalendarSingleInput = ({
  value,
  onChange,
  placeholder = 'Введите дату',
  disabled,
  invalid
}: TCalendarSingleInputProps) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(formatDate(value))

  function formatInput(value: string) {
    const date = value.replace(/[^\d.]/g, '').slice(0, 10)

    let result = ''
    const dotIndexes = [2, 5]

    for (let i = 0; i < date.length; i++) {
      const char = date[i]
      if (!dotIndexes.includes(i)) {
        if (!/\d/.test(char)) break
        result += char
      } else {
        result += '.'
      }
    }
    return result
  }

  const parsedInput = parseToDate(inputValue)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Input
          variant="icon"
          icon={<CalendarIcon />}
          placeholder={open ? '' : placeholder}
          disabled={disabled}
          value={inputValue}
          aria-invalid={invalid}
          onChange={e => setInputValue(formatInput(e.target.value))}
          onBlur={() => {
            onChange?.(parsedInput)
            setInputValue(formatDate(parsedInput) ?? inputValue)
          }}
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 z-100 border-0 rounded-2xl shadow-(--popover-shadow)"
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <Calendar
          mode="single"
          selected={parsedInput}
          onSelect={date => {
            onChange?.(date)
            setInputValue(formatDate(date))
            setOpen(false)
          }}
          defaultMonth={parsedInput}
          autoFocus
          components={{ Dropdown: CustomCalendarDropdown }}
        />
      </PopoverContent>
    </Popover>
  )
}
