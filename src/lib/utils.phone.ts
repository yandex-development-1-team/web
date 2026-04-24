import type { KeyboardEvent } from 'react'

export const formatPhone = (input: string) => {
  let digits = input.replace(/\D/g, '')

  if (!digits.length) return ''

  if (digits[0] !== '7') {
    digits = '7' + digits
  }

  digits = digits.slice(0, 11)

  const parts = [digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)]

  let result = '+7'

  if (parts[0]) result += ' ' + parts[0]
  if (parts[1]) result += ' ' + parts[1]
  if (parts[2]) result += '-' + parts[2]
  if (parts[3]) result += '-' + parts[3]

  return result
}

export const handlePhoneKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
  value: string,
  onChange: (value: string) => void
) => {
  if (e.key !== 'Backspace') return

  const current = value || ''

  if (current === '+7') {
    e.preventDefault()
    onChange('')
    return
  }

  const cursor = (e.target as HTMLInputElement).selectionStart || 0

  if ([' ', '-'].includes(current[cursor - 1])) {
    e.preventDefault()

    const newValue = current.slice(0, cursor - 1) + current.slice(cursor)

    onChange(newValue)
  }
}
