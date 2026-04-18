import { z } from 'zod'

const hasCyrillicLetter = (val: string) => /[a-zA-ZА-Яа-яЁё]/.test(val)

const baseValidation = z
  .string()
  .trim()
  .refine(val => val.length > 0, {
    message: 'Поле не может быть пустым'
  })

const lettersValidation = baseValidation
  .refine(hasCyrillicLetter, 'Поле может содержать только буквы')
  .refine(val => val === '' || val.length >= 2, {
    message: 'Минимум 2 буквы'
  })

const photoSchema = z
  .instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, 'Максимум 5MB')
  .nullable()

const personalInfoSchema = z.object({
  surname: lettersValidation,
  firstName: lettersValidation,
  patronymic: lettersValidation
})

const contactInfoSchema = z.object({
  phone: baseValidation
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 11 && val.startsWith('7'), {
      message: 'Введите корректный номер'
    }),
  email: baseValidation.email('Введите корректный email'),
  city: lettersValidation
})

const jobInfoSchema = z.object({
  department: lettersValidation,
  position: lettersValidation,
  chief: lettersValidation
})

const accessLevelSchema = z.object({
  roleId: z.number().nullable()
})

export const employeeFormSchema = z.object({
  photo: photoSchema,
  personalInfo: personalInfoSchema,
  contactInfo: contactInfoSchema,
  jobInfo: jobInfoSchema,
  accessLevel: accessLevelSchema
})

export type EmployeeFormData = z.infer<typeof employeeFormSchema>
