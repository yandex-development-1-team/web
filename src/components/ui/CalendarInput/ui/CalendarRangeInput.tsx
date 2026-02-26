import { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './Popover'
import { Calendar, CustomCalendarDropdown } from './Calendar'
import { Input } from '@/components/ui/Input'
import { CalendarIcon } from '@/assets/icons'
import { formatDate, parseToDateRange } from '@/lib/utils.date'
import type { TCalendarRangeInputProps } from '../CalendarInput.types'

export const CalendarRangeInput = ({
  value,
  onChange,
  placeholder = 'Выберите период',
  disabled,
  invalid
}: TCalendarRangeInputProps) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(() => {
    if (value?.from && value?.to) return `${formatDate(value.from)}-${formatDate(value.to)}`
    if (value?.from) return formatDate(value.from)
    return ''
  })

  const parsedInput = parseToDateRange(inputValue)

  function handleBlur() {
    if (!parsedInput) {
      onChange?.(undefined)
      return
    }
    const { from, to } = parsedInput

    onChange?.({
      from: from,
      to: to
    })
    setInputValue(`${formatDate(from)}${formatDate(to) ? '-' + formatDate(to) : ''}`)
  }

  function formatInput(value: string) {
    const date = value.replace(/[^\d.-]/g, '').slice(0, 21)

    let result = ''
    const dotIndexes = [2, 5, 13, 16]
    const dashIndex = [10]

    for (let i = 0; i < date.length; i++) {
      const char = date[i]
      if (!dotIndexes.includes(i) && !dashIndex.includes(i)) {
        if (!/\d/.test(char)) break
        result += char
      } else if (dotIndexes.includes(i)) {
        result += '.'
      } else result += '-'
    }
    return result
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Input
          variant="icon"
          icon={<CalendarIcon />}
          placeholder={open ? '' : placeholder}
          disabled={disabled}
          value={inputValue}
          onChange={e => setInputValue(formatInput(e.target.value))}
          onBlur={handleBlur}
          aria-invalid={invalid}
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 z-100 border-0 rounded-2xl shadow-(--popover-shadow)"
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={selected => {
            const from = selected?.from
            const to = selected?.to
            setInputValue(from ? `${formatDate(from)}${to ? '-' + formatDate(to) : ''}` : '')
            onChange?.({
              from: from,
              to: to
            })
          }}
          defaultMonth={parsedInput?.from}
          autoFocus
          components={{ Dropdown: CustomCalendarDropdown }}
        />
      </PopoverContent>
    </Popover>
  )
}
