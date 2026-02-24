import { useEffect, useRef } from 'react'
import { DayPicker, getDefaultClassNames, type DayButton, type DropdownProps } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import { Button, buttonVariants } from '@/components/ui/Button'
import { SelectTrigger, SelectValue, SelectContent, SelectItem, SelectBase } from '../../Select'
import { ArrowIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import { capitalizeFirstLetter } from '@/lib/utils.string'

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()
  const currentYear = new Date().getFullYear()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      weekStartsOn={1}
      locale={ru}
      labels={{
        labelNext: () => 'Следующий месяц',
        labelPrevious: () => 'Предыдущий месяц',
        labelMonthDropdown: () => 'Выберите месяц',
        labelYearDropdown: () => 'Выберите год'
      }}
      className={cn(
        'bg-white group/calendar p-4 pt-[14px] [--cell-size:--spacing(10.2)] rounded-2xl border border-calendar-border',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      formatters={{
        formatMonthDropdown: date => capitalizeFirstLetter(date.toLocaleString('default', { month: 'short' })),
        formatWeekdayName: weekday => capitalizeFirstLetter(weekday.toLocaleString('default', { weekday: 'short' })),
        ...formatters
      }}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(currentYear + 5, 11)}
      classNames={{
        root: cn('w-fit text-calendar-text font-display', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative border border-calendar-border rounded-lg has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none rounded-md pl-1.5 pr-1.5 flex items-center gap-5 h-7 text-h5 font-normal',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('text-weekdays-label flex', defaultClassNames.weekdays),
        weekday: cn('rounded-md flex-1 font-normal text-xxs select-none', defaultClassNames.weekday),
        week: cn('flex w-full mt-0', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn('text-[0.8rem] select-none text-muted-foreground', defaultClassNames.week_number),
        day: cn(
          'relative w-full h-full p-0 text-center [&:last-child[range-middle=true]_button]:rounded-none group/day aspect-square select-none',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-md'
            : '[&:first-child[range-middle=true]_button]:rounded-none',
          defaultClassNames.day
        ),
        range_start: cn('rounded-l-md', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md', defaultClassNames.range_end),
        today: cn('bg-grey-extra-light rounded-md', defaultClassNames.today),
        outside: cn('text-outside-days', defaultClassNames.outside),
        disabled: cn('text-calendar-text opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ArrowIcon className={cn('size-4 rotate-90 stroke-[3px]', className)} {...props} />
          }

          if (orientation === 'right') {
            return <ArrowIcon className={cn('size-4 -rotate-90 stroke-[3px]', className)} {...props} />
          }

          return <ArrowIcon className={cn('size-4', className)} {...props} />
        },
        DayButton: props => <CalendarDayButton {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
            </td>
          )
        },
        ...components
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        `text-h5 font-normal flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 [:hover]:bg-yellow-light [:hover]:text-calendar-text data-[selected-single=true]:bg-yellow-light data-[selected-single=true]:text-calendar-text group-data-[focused=true]/day:ring-[0px] data-[range-start=true]:bg-yellow-light data-[range-end=true]:bg-yellow-light data-[range-middle=true]:bg-yellow-light data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-none data-[range-start=true]:rounded-l-md data-[range-end=true]:rounded-none data-[range-end=true]:rounded-r-md`,
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export function CustomCalendarDropdown(props: DropdownProps) {
  const { options, value, onChange, 'aria-label': ariaLabel } = props

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue
        }
      } as React.ChangeEvent<HTMLSelectElement>

      onChange(syntheticEvent)
    }
  }

  return (
    <SelectBase value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger
        aria-label={ariaLabel}
        className="z-400 text-calendar-text min-w-22 h-7 p-1.5 text-h5 border-calendar-border [&_svg]:size-4 [&_svg]:stroke-[3px] [&_svg:not([class*='text-'])]:text-calendar-text"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-400 text-calendar-text">
        {options?.map(option => (
          <SelectItem
            key={option.value}
            value={option.value.toString()}
            disabled={option.disabled}
            className="z-400 text-xs"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectBase>
  )
}
