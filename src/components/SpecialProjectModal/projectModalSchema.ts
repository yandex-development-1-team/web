import z from 'zod'

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Поле обязательно для заполнения',
  MIN_LENGTH: (min: number) => `Минимум ${min} символа`,
  MAX_LENGTH: (max: number) => `Максимум ${max} символов`
} as const

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .min(3, VALIDATION_MESSAGES.MIN_LENGTH(3))
    .max(20, VALIDATION_MESSAGES.MAX_LENGTH(200)),
  description: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .min(3, VALIDATION_MESSAGES.MIN_LENGTH(3))
    .max(30, VALIDATION_MESSAGES.MAX_LENGTH(200)),
  is_active_in_bot: z.boolean(),

  image: z.string().nullable().optional()
})

export type TProjectSchema = z.infer<typeof projectSchema>
