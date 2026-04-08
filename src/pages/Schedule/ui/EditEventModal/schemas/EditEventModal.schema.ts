import { z } from 'zod'

export const eventFormSchema = z.object({
  box_name: z.string().min(1, 'Название бокса обязательно'),

  date: z.string().min(1, 'Дата обязательна'),

  time: z
    .object({
      from: z.string().optional(),
      to: z.string().optional()
    })
    .optional(),

  total_slots: z.number({
    error: 'Количество слотов обязательно'
  }),

  location: z.string().min(1, 'Локация обязательна')
})

export type FormFields = z.infer<typeof eventFormSchema>
