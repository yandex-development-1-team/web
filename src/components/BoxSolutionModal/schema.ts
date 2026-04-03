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

const timeSlotSchema = z.object({
  date: z.date().optional(),
  timeRange: z.custom<TimeRange>().optional()
})

export const boxSolutionSchema = z.object({
  name: trimmedString.refine(hasLetter, 'Должна быть хотя бы одна буква').refine(val => val.length >= 2, {
    message: 'Минимум 2 символа'
  }),

  isActive: z.boolean(),

  timeSlots: z.array(timeSlotSchema).superRefine((slots, ctx) => {
    slots.forEach((slot, index) => {
      const hasDate = !!slot.date
      const hasTime = !!slot.timeRange?.from || !!slot.timeRange?.to

      if (!hasDate && !hasTime) return

      if (!hasDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Выберите дату',
          path: [index, 'date']
        })
      }

      if (!slot.timeRange?.from || !slot.timeRange?.to) {
        ctx.addIssue({
          code: 'custom',
          message: 'Укажите время начала и окончания',
          path: [index, 'timeRange']
        })
      }
    })
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
