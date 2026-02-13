import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover/Popover'
import { formatDate, parseToDate } from '@/lib/utils.date'
import { Calendar } from '../Calendar/Calendar'

interface CalendarSingleInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
}

export const CalendarSingleInput: React.FC<CalendarSingleInputProps> = ({
  value,
  onChange,
  placeholder = 'Введите дату',
  disabled
}) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(formatDate(value))

  useEffect(() => {
    setInputValue(formatDate(value))
  }, [value])

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
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
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
        />
      </PopoverContent>
    </Popover>
  )
}
