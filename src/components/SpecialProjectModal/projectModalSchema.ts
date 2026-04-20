import z from 'zod'

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Поле обязательно для заполнения',
  MIN_LENGTH: (min: number) => `Минимум ${min} символа`,
  MAX_LENGTH: (max: number) => `Максимум ${max} символов`
} as const

export const projectSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string().trim().min(1, VALIDATION_MESSAGES.REQUIRED).max(200, VALIDATION_MESSAGES.MAX_LENGTH(200)),
  description: z.string().trim().min(1, VALIDATION_MESSAGES.REQUIRED).max(200, VALIDATION_MESSAGES.MAX_LENGTH(200)),
  isActive: z.boolean(),
  image: z.string().optional()
})

export type TProjectSchema = z.infer<typeof projectSchema>
