import { z } from 'zod'

const onlyLetters = (val: string) => /^[a-zA-ZА-Яа-яЁё\s-]+$/.test(val)

const baseValidation = z
  .string()
  .trim()
  .refine(val => val.length > 0, {
    message: 'Поле не может быть пустым'
  })

const requiredLettersValidation = baseValidation
  .refine(onlyLetters, 'Поле может содержать только буквы')
  .refine(val => val === '' || val.length >= 2, {
    message: 'Минимум 2 буквы'
  })

const optionalLettersValidation = z
  .string()
  .trim()
  .refine(val => val === '' || onlyLetters(val), 'Поле может содержать только буквы')
  .refine(val => val === '' || val.length >= 2, 'Минимум 2 буквы')

const photoSchema = z
  .instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, 'Максимум 5MB')
  .nullable()

const personalInfoSchema = z.object({
  surname: requiredLettersValidation,
  firstName: requiredLettersValidation,
  patronymic: optionalLettersValidation
})

const contactInfoSchema = z.object({
  phone: baseValidation.refine(val => /^(\+7|7)\d{10}$/.test(val.replace(/\D/g, '')), {
    message: 'Введите корректный номер'
  }),
  email: baseValidation.email('Введите корректный email'),
  city: requiredLettersValidation
})

const jobInfoSchema = z.object({
  department: requiredLettersValidation,
  position: requiredLettersValidation,
  chief: requiredLettersValidation
})

const accessLevelSchema = z.object({
  roleId: z
    .number()
    .optional()
    .refine(roleId => roleId !== undefined, {
      message: 'Выберите уровень доступа'
    })
})

export const employeeFormSchema = z.object({
  photo: photoSchema,
  personalInfo: personalInfoSchema,
  contactInfo: contactInfoSchema,
  jobInfo: jobInfoSchema,
  accessLevel: accessLevelSchema
})

export type EmployeeFormData = z.infer<typeof employeeFormSchema>
