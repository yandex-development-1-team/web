import type { TimeRange } from '@/lib/utils.time'
import { z } from 'zod'

const trimmedString = z
  .string()
  .transform(val => val.trim())
  .refine(val => val.length > 0, {
    message: 'Поле не может быть пустым'
  })

const hasLetter = (val: string) => /[a-zA-Zа-яА-Я]/.test(val)

const isValidNumber = (val: string) => {
  const trimmed = val.trim()
  const num = Number(trimmed)
  return !isNaN(num) && trimmed !== '' && num >= 0
}

export const boxSolutionSchema = z.object({
  name: trimmedString.refine(hasLetter, 'Должна быть хотя бы одна буква').refine(val => val.length >= 2, {
    message: 'Минимум 2 символа'
  }),

  isActive: z.boolean(),

  date: z
    .date()
    .optional()
    .refine(val => val !== undefined, {
      message: 'Выберите дату'
    }),

  timeRange: z
    .custom<TimeRange>()
    .optional()
    .refine(val => val !== undefined, {
      message: 'Выберите время'
    })
    .refine(val => val?.from && val?.to, {
      message: 'Укажите корректное время начала и окончания'
    }),

  location: trimmedString,

  description: trimmedString,

  rules: z.string().transform(val => val.trim()),

  cost: trimmedString.refine(isValidNumber, 'Введите корректное число'),

  organizer: z
    .string()
    .transform(val => val.trim())
    .refine(val => val === '' || val.length >= 2, {
      message: 'Минимум 2 символа'
    })
    .refine(val => val === '' || hasLetter(val), {
      message: 'Должна быть хотя бы одна буква'
    }),

  image: z.instanceof(FileList).nullable().optional()
})
