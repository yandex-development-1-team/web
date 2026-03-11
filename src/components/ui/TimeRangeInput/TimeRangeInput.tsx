/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../CalendarInput/ui/Popover'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { TimeIcon, ArrowIcon } from '@/assets/icons'
import { formatTimeRange, formatTimeInput, incrementTime, parseTime } from '@/lib/utils.time'
import { cn } from '@/lib/utils.clsx'
import type { TimeRangeInputType } from './TimeRangeInput.types'

export const TimeRangeInput = ({
  value,
  onChange,
  placeholder = 'Выберите время',
  disabled,
  invalid,
  className
}: TimeRangeInputType) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(() => {
    if (value?.from && value?.to) return formatTimeRange(value.from, value.to)
    if (value?.from) return value.from
    return ''
  })

  const [fromTime, setFromTime] = useState(value?.from || '')
  const [toTime, setToTime] = useState(value?.to || '')

  useEffect(() => {
    if (value?.from && value?.to) {
      setInputValue(formatTimeRange(value.from, value.to))
    } else if (value?.from) {
      setInputValue(value.from)
    } else if (value?.to) {
      setInputValue(value.to)
    } else {
      setInputValue('')
    }

    setFromTime(value?.from || '')
    setToTime(value?.to || '')
  }, [value])

  function handleTimeChange(type: 'from' | 'to', newValue: string) {
    const formatted = formatTimeInput(newValue)

    if (type === 'from') {
      setFromTime(formatted)
      if (formatted.length === 5 && parseTime(formatted)) {
        const newValue = {
          from: formatted,
          to: toTime || undefined
        }
        onChange?.(newValue)
        setInputValue(toTime ? formatTimeRange(formatted, toTime) : formatted)
      } else if (!formatted) {
        setInputValue(toTime || '')
        onChange?.({ from: undefined, to: toTime || undefined })
      }
    } else {
      setToTime(formatted)
      if (formatted.length === 5 && parseTime(formatted)) {
        const newValue = {
          from: fromTime || undefined,
          to: formatted
        }
        onChange?.(newValue)
        setInputValue(fromTime ? formatTimeRange(fromTime, formatted) : formatted)
      } else if (!formatted) {
        setInputValue(fromTime || '')
        onChange?.({ from: fromTime || undefined, to: undefined })
      }
    }
  }

  function handleIncrement(type: 'from' | 'to', minutes: number) {
    const currentTime = type === 'from' ? fromTime : toTime
    if (!currentTime || parseTime(currentTime) === undefined) return

    const newTime = incrementTime(currentTime, minutes)

    if (type === 'from') {
      setFromTime(newTime)
      onChange?.({
        from: newTime,
        to: toTime || undefined
      })
      setInputValue(toTime ? formatTimeRange(newTime, toTime) : newTime)
    } else {
      setToTime(newTime)
      onChange?.({
        from: fromTime || undefined,
        to: newTime
      })
      setInputValue(fromTime ? formatTimeRange(fromTime, newTime) : newTime)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Input
          variant="icon"
          icon={<TimeIcon />}
          iconPosition="inline-end"
          placeholder={open ? '' : placeholder}
          disabled={disabled}
          value={inputValue}
          readOnly
          onClick={() => !disabled && setOpen(true)}
          aria-invalid={invalid}
          className={className}
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-auto bg-white border border-grey-light p-[20px] z-100 rounded-[8px] shadow-(--popover-shadow)"
        align="end"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-[8px]">
          <TimeInput
            label="с"
            value={fromTime}
            onChange={value => handleTimeChange('from', value)}
            onIncrement={minutes => handleIncrement('from', minutes)}
          />
          <TimeInput
            label="до"
            value={toTime}
            onChange={value => handleTimeChange('to', value)}
            onIncrement={minutes => handleIncrement('to', minutes)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface TimeInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  onIncrement: (minutes: number) => void
}

function TimeInput({ label, value, onChange, onIncrement }: TimeInputProps) {
  return (
    <div className="flex items-center gap-[16px]">
      <span className="text-base text-text min-w-5">{label}</span>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="00:00"
        className={cn('text-center pr-8 h-[30px] w-[74px] p-0', value && 'underline decoration-current')}
        maxLength={5}
      />
      <div className="flex flex-col">
        <Button
          variant="ghost"
          className="text-text-grey-light hover:text-text h-[15px] w-[15px]"
          onClick={() => onIncrement(15)}
          aria-label="Увеличить время"
          type="button"
        >
          <ArrowIcon className="size-full rotate-180" />
        </Button>
        <Button
          variant="ghost"
          className="text-text-grey-light hover:text-text h-[15px] w-[15px]"
          onClick={() => onIncrement(-15)}
          aria-label="Уменьшить время"
          type="button"
        >
          <ArrowIcon className="size-full" />
        </Button>
      </div>
    </div>
  )
}
