import { useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayPicker, getDefaultClassNames, type DayButton } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { ru } from 'date-fns/locale'
import { Button } from '@/components/ui/Button/button'
import { capitalizeFirstLetter } from '@/lib/utils.string'
import { buttonVariants } from '../Button'

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
      className={cn(
        'bg-white group/calendar p-4 pt-[14px] [--cell-size:--spacing(10.2)] rounded-2xl border border-[var(--color-calendar-border)]',
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
      endMonth={new Date(currentYear + 1, 11)}
      classNames={{
        root: cn('w-fit text-[color:var(--calendar-text)]', defaultClassNames.root),
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
          'relative border border-[color:var(--color-calendar-border)] rounded-lg shadow-xs has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none rounded-md pl-1.5 pr-1.5 flex items-center gap-5 h-7 text-h5 font-normal',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('text-[color:var(--color-weekdays-label)] flex', defaultClassNames.weekdays),
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
        today: cn('bg-[color:var(--color-grey-extra-light)] rounded-md', defaultClassNames.today),
        outside: cn('text-[color:var(--color-outside-days)]', defaultClassNames.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-5', className)} {...props} />
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-5', className)} {...props} />
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />
        },
        DayButton: CalendarDayButton,
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
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'text-h5 font-normal flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 [:hover]:bg-[color:var(--color-yellow-light)] data-[selected-single=true]:bg-[color:var(--color-yellow-light)] data-[selected-single=true]:text-[color:var(--color-text)] group-data-[focused=true]/day:ring-[0px] data-[range-start=true]:bg-[color:var(--color-yellow-light)] data-[range-start=true]:bg-[color:var(--color-yellow-light)] data-[range-end=true]:bg-[color:var(--color-yellow-light)] data-[range-middle=true]:bg-[color:var(--color-yellow-light)] data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-none data-[range-start=true]:rounded-l-md data-[range-end=true]:rounded-none data-[range-end=true]:rounded-r-md',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}
