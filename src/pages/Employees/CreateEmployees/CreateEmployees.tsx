import { useState, useRef } from 'react'
import { useForm, useWatch, Controller, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils.clsx'
import type { IEmployeeFormData } from './CreateEmployees.types'
import mockPhoto from '@/mockData/mock_photo.jpg'
import { DownloadIcon, UserCreateIcon } from '@/assets/icons'
import { departments, roles, genderOptions, citizenshipOptions } from './createEmployeesData'
import { Input, Select, Button, Switch, CalendarInput } from '@/components/ui'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

export const CreateEmployees = () => {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<IEmployeeFormData>({
    defaultValues: {
      photo: null,
      personalInfo: {
        surname: '',
        firstName: '',
        patronymic: ''
      },
      passportData: {
        citizenship: '',
        birthDate: '',
        gender: null,
        passportSeries: '',
        passportNumber: ''
      },
      contactInfo: {
        phone: '',
        email: ''
      },
      jobInfo: {
        departmentId: null,
        position: ''
      },
      accessLevel: {
        roleId: null
      }
    }
  })

  const roleId = useWatch({
    control,
    name: 'accessLevel.roleId'
  })

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Только PNG или JPG')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Максимум 5MB')
      return
    }

    setValue('photo', file)

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onSubmit: SubmitHandler<IEmployeeFormData> = data => {
    if (!data.roleId) {
      toast.error('Выберите уровень доступа')
      return
    }

    console.log(data)
    navigate('/employee-card')
  }

  return (
    <>
      <h2 className="bg-white p-[18px_20px] rounded-md text-h2">Добавить сотрудника</h2>

      <div className="mt-[12px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-[20px]">
          <div className="grid grid-cols-[250px_1fr] gap-[20px]">
            <div className="bg-white p-[20px] rounded-md flex flex-col items-center justify-center">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-[146px] h-[146px] rounded-full border border-yellow-accent-light flex items-center justify-center cursor-pointer overflow-hidden mx-auto relative"
              >
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img
                      src={mockPhoto}
                      className="object-cover object-center w-[132px] h-[132px] rounded-full brightness-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DownloadIcon className="w-8 h-8 text-white" />
                    </div>
                  </>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handlePhoto}
              />
            </div>

            <div className="bg-white p-[20px_20px_0px] rounded-md flex flex-col">
              <div className="flex items-center gap-3 ml-[4px] mb-[15px]">
                <UserCreateIcon className="w-4 h-4 color-grey-dark" />
                <h3 className="text-h3">Персональная информация</h3>
              </div>
              <div className="bg-white flex flex-col">
                <label className="flex flex-col">
                  <span className="text-xxs text-text-grey-dark">Фамилия</span>
                  <Input
                    type="text"
                    variant="text"
                    placeholder="Фамиля"
                    aria-invalid={!!errors.personalInfo?.surname}
                    {...register('personalInfo.surname', {
                      required: 'Введите фамилию',
                      minLength: {
                        value: 2,
                        message: 'Фамилия должно быть введена'
                      },
                      pattern: {
                        value: /^[А-Яа-яЁё]+$/u,
                        message: 'Фамилия может содержать только буквы'
                      },
                      onChange: () => {
                        if (errors.personalInfo?.surname) {
                          clearErrors('personalInfo.surname')
                        }
                      }
                    })}
                  />
                  <span className="text-xxs text-text-error min-h-[16px]">
                    {errors.personalInfo?.surname?.message || '\u00A0'}
                  </span>
                </label>
                <label className="flex flex-col">
                  <span className="text-xxs text-text-grey-dark">Имя</span>
                  <Input
                    type="text"
                    variant="text"
                    placeholder="Имя"
                    aria-invalid={!!errors.personalInfo?.firstName}
                    {...register('personalInfo.firstName', {
                      required: 'Введите имя',
                      minLength: {
                        value: 2,
                        message: 'Имя должно быть введено'
                      },
                      pattern: {
                        value: /^[А-Яа-яЁё]+$/u,
                        message: 'Имя может содержать только буквы'
                      },
                      onChange: () => {
                        if (errors.personalInfo?.firstName) {
                          clearErrors('personalInfo.firstName')
                        }
                      }
                    })}
                  />
                  <span className="text-xxs text-text-error min-h-[16px]">
                    {errors.personalInfo?.firstName?.message || '\u00A0'}
                  </span>
                </label>

                <label className="flex flex-col">
                  <span className="text-xxs text-text-grey-dark">Отчество</span>
                  <Input
                    type="text"
                    variant="text"
                    placeholder="Отчество"
                    aria-invalid={!!errors.personalInfo?.patronymic}
                    {...register('personalInfo.patronymic', {
                      required: 'Введите отчество',
                      minLength: {
                        value: 2,
                        message: 'Отчество должно быть введено'
                      },
                      pattern: {
                        value: /^[А-Яа-яЁё]+$/u,
                        message: 'Отчество может содержать только буквы'
                      },
                      onChange: () => {
                        if (errors.personalInfo?.patronymic) {
                          clearErrors('personalInfo.patronymic')
                        }
                      }
                    })}
                  />
                  <span className="text-xxs text-text-error min-h-[16px]">
                    {errors.personalInfo?.patronymic?.message || '\u00A0'}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white p-[18px_20px_0px] rounded-md">
            <div className="grid grid-cols-[500px_1fr] gap-[39px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 ml-[4px] mb-[15px]">
                  <UserCreateIcon className="w-4 h-4 color-grey-dark" />
                  <h3 className="text-h3">Паспортные данные</h3>
                </div>
                <div className="bg-white flex flex-col">
                  <Controller
                    name="citizenship"
                    control={control}
                    rules={{ required: 'Выберите гражданство' }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <label className="flex flex-col gap-[4px]">
                        <span className="text-xxs text-text-grey-dark">Гражданство</span>
                        <Select
                          options={citizenshipOptions}
                          value={value ?? ''}
                          placeholder="РФ"
                          onValueChange={onChange}
                          classNames={{
                            trigger: cn('w-full', error && 'border-system-error')
                          }}
                        />
                      </label>
                    )}
                  />
                  <div className="flex gap-[8px] mt-[12px]">
                    <label className="flex flex-col gap-[3px] flex-1">
                      <span className="text-xxs text-text-grey-dark">Дата рождения</span>
                      <Controller
                        name="passportData.birthDate"
                        control={control}
                        rules={{
                          required: 'Обязательное поле',
                          validate: value => {
                            if (!value) return 'Обязательное поле'
                            const date = new Date(value)
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            if (date > today) return 'Дата не может быть в будущем'
                            return true
                          }
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <div className="flex flex-col  flex-1">
                            <CalendarInput
                              variant="single"
                              value={value ? new Date(value) : undefined}
                              onChange={date => {
                                const formattedDate = date ? date.toISOString().split('T')[0] : ''
                                onChange(formattedDate)
                              }}
                              placeholder=""
                              disabled={false}
                              invalid={!!error}
                            />
                          </div>
                        )}
                      />
                    </label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: 'Выберите пол' }}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <label className="flex flex-col gap-[3px] flex-1">
                          <span className="text-xxs text-text-grey-dark">Пол</span>
                          <Select
                            options={genderOptions}
                            value={value ?? ''}
                            placeholder="Пол"
                            onValueChange={onChange}
                            classNames={{
                              trigger: cn('w-full', error && 'border-system-error')
                            }}
                          />
                        </label>
                      )}
                    />
                  </div>

                  <div className="flex gap-[8px] mt-[12px]">
                    <label className="flex flex-col gap-[3px] flex-1">
                      <span className="text-xxs text-text-grey-dark">Серия паспорта</span>
                      <Input
                        type="text"
                        variant="text"
                        placeholder="Серия паспорта"
                        maxLength={4}
                        aria-invalid={!!errors.passportData?.passportSeries}
                        {...register('passportData.passportSeries', {
                          required: 'Введите серию паспорта',
                          pattern: {
                            value: /^\d{4}$/,
                            message: 'Серия должна состоять из 4 цифр'
                          },
                          onChange: () => {
                            if (errors.passportData?.passportSeries) {
                              clearErrors('passportData.passportSeries')
                            }
                          }
                        })}
                      />
                      <span className="text-xxs text-text-error min-h-[16px]">
                        {errors.passportData?.passportSeries?.message || '\u00A0'}
                      </span>
                    </label>

                    <label className="flex flex-col gap-[3px] flex-1">
                      <span className="text-xxs text-text-grey-dark">Номер паспорта</span>
                      <Input
                        type="text"
                        variant="text"
                        placeholder="Номер паспорта"
                        maxLength={6}
                        aria-invalid={!!errors.passportData?.passportNumber}
                        {...register('passportData.passportNumber', {
                          required: 'Введите номер паспорта',
                          pattern: {
                            value: /^\d{6}$/,
                            message: 'Номер должен состоять из 6 цифр'
                          },
                          onChange: () => {
                            if (errors.passportData?.passportNumber) {
                              clearErrors('passportData.passportNumber')
                            }
                          }
                        })}
                      />
                      <span className="text-xxs text-text-error min-h-[16px]">
                        {errors.passportData?.passportNumber?.message || '\u00A0'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3 ml-[5px] mb-[7px]">
                  <UserCreateIcon className="w-4 h-4 color-grey-dark" />
                  <h3 className="text-h3">Контактная информация</h3>
                </div>
                <div className="flex flex-col gap-[12px] mt-[8px] max-w-[352px]">
                  <label className="flex flex-col gap-[3px]">
                    <span className="text-xxs text-text-grey-dark">Номер телефона</span>
                    <Input
                      type="tel"
                      variant="text"
                      placeholder="+7 (999) 999-66-77"
                      aria-invalid={!!errors.contactInfo?.phone}
                      {...register('contactInfo.phone', {
                        required: 'Введите номер телефона',
                        pattern: {
                          value: /^\+?[1-9][0-9]{7,14}$/,
                          message: 'Введите полный номер'
                        },
                        onChange: e => {
                          const filtered = e.target.value.replace(/[^\d\s+\-()]/g, '')
                          if (filtered !== e.target.value) {
                            e.target.value = filtered
                          }
                          if (errors.contactInfo?.phone) clearErrors('contactInfo.phone')
                        }
                      })}
                    />
                  </label>

                  <label className="flex flex-col gap-[3px]">
                    <span className="text-xxs text-text-grey-dark">E-mail</span>
                    <Input
                      type="email"
                      variant="text"
                      placeholder="E-mail"
                      aria-invalid={!!errors.contactInfo?.email}
                      {...register('contactInfo.email', {
                        required: 'Введите почту',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Введите корректный email'
                        },
                        onChange: () => {
                          if (errors.contactInfo?.email) {
                            clearErrors('contactInfo.email')
                          }
                        }
                      })}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[440px_1fr] gap-[20px]">
            <div className="bg-white p-[18px_20px_0px] rounded-md flex flex-col gap-[8px]">
              <div className="flex items-center gap-3 ml-[4px]">
                <UserCreateIcon className="w-4 h-4 color-grey-dark" />
                <h3 className="text-h3">Должностная информация</h3>
              </div>
              <div className="flex flex-col mt-[8px] gap-[12px]">
                <Controller
                  name="departmentId"
                  control={control}
                  rules={{ required: 'Выберите отдел' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <label className="flex flex-col gap-[3px]">
                      <span className="text-xxs text-text-grey-dark">Отдел</span>
                      <Select
                        placeholder="Отдел"
                        options={departments.map(d => ({
                          value: d.id.toString(),
                          label: d.name
                        }))}
                        value={value?.toString() ?? ''}
                        onValueChange={v => onChange(Number(v))}
                        classNames={{
                          trigger: cn('w-full', error && 'border-system-error')
                        }}
                      />
                    </label>
                  )}
                />

                <Controller
                  name="roleId"
                  control={control}
                  rules={{ required: 'Выберите должность' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <label className="flex flex-col gap-[3px]">
                      <span className="text-xxs text-text-grey-dark">Должность</span>
                      <Select
                        placeholder="Должность"
                        options={roles.map(d => ({
                          value: d.id.toString(),
                          label: d.name
                        }))}
                        value={value?.toString() ?? ''}
                        onValueChange={v => onChange(Number(v))}
                        classNames={{
                          trigger: cn('w-full', error && 'border-system-error')
                        }}
                      />
                      <span className="text-xxs text-text-error min-h-[16px]">{error?.message || '\u00A0'}</span>
                    </label>
                  )}
                />
              </div>
            </div>

            <div className="bg-white p-[18px_12px_0px] rounded-md flex flex-col gap-[12px]">
              <div className="flex items-center gap-3 col-span-2 ml-[4px] mb-[7px] ">
                <UserCreateIcon className="w-4 h-4 color-grey-dark" />
                <h3 className="text-h3">Уровень доступа</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-[80px] gap-y-[42px]">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between gap-[4px] border-b border-grey-light pb-1"
                  >
                    <div>
                      <div className="text-small text-text-grey-dark">{role.name}</div>
                      <div className="text-text-grey-dark text-xxs ">{role.description}</div>
                    </div>

                    <Switch
                      checked={roleId === role.id}
                      onChange={() => {
                        setValue('roleId', role.id)
                        clearErrors('roleId')
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-[20px]">
            <Button
              label="Отменить"
              variant="secondary"
              onClick={() => {
                reset()
                setPreview(null)
                if (fileRef.current) fileRef.current.value = ''
              }}
              className="w-[146px] min-h-[46px]"
            />
            <Button label="Сохранить" type="submit" className="w-[146px] min-h-[46px]" />
          </div>
        </form>
      </div>
    </>
  )
}

export const Component = CreateEmployees
