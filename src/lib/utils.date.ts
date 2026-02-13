import type { DateRange } from 'react-day-picker'

// Форматирует дату в строку "dd.mm.yyyy"
export function formatDate(date: Date | undefined): string {
  if (!date) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Форматирует строку "dd.mm.yyyy" в Date, возвращает undefined если невалидная
export function parseToDate(value: string): Date | undefined {
  const parts = value.split('.')
  if (parts.length !== 3) return undefined

  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)

  const date = new Date(year, month, day)

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return undefined
  }

  return date
}

// Форматирует строку "dd.mm.yyyy-dd.mm.yyyy" в DateRange
export function parseToDateRange(str: string): DateRange | undefined {
  if (str === '') return undefined
  const parts = str.split('-').map(s => s.trim())

  const startStr = parts[0] || ''
  const endStr = parts[1] || ''

  const from = startStr ? parseToDate(startStr) : undefined
  const to = endStr ? parseToDate(endStr) : undefined

  if (to && from && to < from) return { from: to, to: from }

  return { from, to }
}

// Проверяет, что дата валидная
export function isValidDate(date: Date | undefined): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}
