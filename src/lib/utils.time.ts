export interface TimeRange {
  from?: string // формат "HH:mm"
  to?: string // формат "HH:mm"
}

// Форматирует время в строку "HH:mm"
export function formatTime(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

// Парсит строку "HH:mm" в объект {hours, minutes}
export function parseTime(value: string): { hours: number; minutes: number } | undefined {
  const parts = value.split(':')
  if (parts.length !== 2) return undefined

  const hours = parseInt(parts[0], 10)
  const minutes = parseInt(parts[1], 10)

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return undefined
  }

  return { hours, minutes }
}

// Вычисляет разницу между двумя временами в часах
export function calculateDuration(from: string, to: string): string {
  const fromTime = parseTime(from)
  const toTime = parseTime(to)

  if (!fromTime || !toTime) return ''

  const fromMinutes = fromTime.hours * 60 + fromTime.minutes
  let toMinutes = toTime.hours * 60 + toTime.minutes

  if (toMinutes < fromMinutes) {
    toMinutes += 24 * 60
  }

  const diffMinutes = toMinutes - fromMinutes
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60

  if (hours === 0) {
    return `${minutes} мин`
  } else if (minutes === 0) {
    return `${hours} ${getHourWord(hours)}`
  } else {
    return `${hours} ${getHourWord(hours)} ${minutes} мин`
  }
}

// Возвращает правильное склонение слова "час"
function getHourWord(hours: number): string {
  const lastDigit = hours % 10
  const lastTwoDigits = hours % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'часов'
  }

  if (lastDigit === 1) {
    return 'час'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'часа'
  }

  return 'часов'
}

// Форматирует диапазон времени для отображения в инпуте
export function formatTimeRange(from: string, to: string): string {
  if (!from && !to) return ''
  if (!to) return from

  const duration = calculateDuration(from, to)
  return `${from}-${to}${duration ? ` (${duration})` : ''}`
}

// Парсит строку диапазона времени "HH:mm-HH:mm" или "HH:mm-HH:mm (duration)"
export function parseToTimeRange(str: string): TimeRange | undefined {
  if (str.trim() === '') return undefined

  const cleanStr = str.replace(/\s*\([^)]*\)\s*$/, '').trim()
  const parts = cleanStr.split('-').map(s => s.trim())

  const from = parts[0] || ''
  const to = parts[1] || ''

  const fromValid = from ? parseTime(from) !== undefined : true
  const toValid = to ? parseTime(to) !== undefined : true

  if (!fromValid || !toValid) return undefined

  return { from: from || undefined, to: to || undefined }
}

// Проверяет, что оба времени валидны (переход через полночь разрешен)
export function isValidTimeRange(from: string, to: string): boolean {
  const fromTime = parseTime(from)
  const toTime = parseTime(to)

  return fromTime !== undefined && toTime !== undefined
}

// Форматирует ввод времени в формате HH:mm
export function formatTimeInput(value: string, maxLength: number = 5): string {
  const digits = value.replace(/[^\d]/g, '').slice(0, 4)

  let result = ''
  for (let i = 0; i < digits.length && result.length < maxLength; i++) {
    if (i === 2 && result.length === 2) {
      result += ':'
    }
    result += digits[i]
  }

  return result
}

// Увеличивает время на указанное количество минут
export function incrementTime(time: string, minutes: number): string {
  const parsed = parseTime(time)
  if (!parsed) return time

  let totalMinutes = parsed.hours * 60 + parsed.minutes + minutes

  while (totalMinutes < 0) totalMinutes += 24 * 60
  while (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60

  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  return formatTime(hours, mins)
}
