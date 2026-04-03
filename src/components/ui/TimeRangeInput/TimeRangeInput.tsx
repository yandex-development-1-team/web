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

  const inputValue = value?.from && value?.to ? formatTimeRange(value.from, value.to) : ''

  const [timeRange, setTimeRange] = useState({
    from: value?.from ?? '',
    to: value?.to ?? ''
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeRange({
      from: value?.from ?? '',
      to: value?.to ?? ''
    })
  }, [value])

  const handleTimeChange = (field: 'from' | 'to', newValue: string) => {
    const formatted = formatTimeInput(newValue)

    setTimeRange(prev => ({ ...prev, [field]: formatted }))

    if (formatted.length === 5 && parseTime(formatted)) {
      onChange?.({
        ...value,
        [field]: formatted
      })
    } else if (!formatted) {
      onChange?.({
        ...value,
        [field]: undefined
      })
    }
  }

  const handleIncrement = (field: 'from' | 'to', minutes: number) => {
    const currentTime = timeRange[field]
    if (!currentTime || !parseTime(currentTime)) return

    const newTime = incrementTime(currentTime, minutes)

    setTimeRange(prev => ({ ...prev, [field]: newTime }))

    onChange?.({
      ...value,
      [field]: newTime
    })
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
            value={timeRange.from}
            onChange={value => handleTimeChange('from', value)}
            onIncrement={minutes => handleIncrement('from', minutes)}
          />
          <TimeInput
            label="до"
            value={timeRange.to}
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
          onClick={() => onIncrement(60)}
          aria-label="Увеличить время"
          type="button"
        >
          <ArrowIcon className="size-full rotate-180 stroke-3" />
        </Button>
        <Button
          variant="ghost"
          className="text-text-grey-light hover:text-text h-[15px] w-[15px]"
          onClick={() => onIncrement(-60)}
          aria-label="Уменьшить время"
          type="button"
        >
          <ArrowIcon className="size-full stroke-3" />
        </Button>
      </div>
    </div>
  )
}