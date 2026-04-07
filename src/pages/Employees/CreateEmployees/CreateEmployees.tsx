import { useNotification } from '@/app/providers/notification'
import { DownloadIcon, UserCreateIcon } from '@/assets/icons'
import { Button, Input, Select, Switch } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { useRef, useState } from 'react'
import { Controller, useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { IEmployeeFormData } from './CreateEmployees.types'
import { chief, departments, roles } from './createEmployeesData'

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
      contactInfo: {
        phone: '',
        email: '',
        city: ''
      },
      jobInfo: {
        departmentId: null,
        position: '',
        chief: ''
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

  const { showNotification } = useNotification()

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      showNotification({ message: 'Только PNG или JPG', status: 'error' })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      showNotification({ message: 'Максимум 5MB', status: 'error' })
      return
    }

    setValue('photo', file)

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onSubmit: SubmitHandler<IEmployeeFormData> = data => {
    if (!data.accessLevel?.roleId) {
      showNotification({ message: 'Выберите уровень доступа', status: 'error' })
      return
    }

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
                className="w-[146px] h-[146px] rounded-full border border-yellow-accent-light flex items-center justify-center cursor-pointer overflow-hidden mx-auto relative bg-white"
              >
                {preview ? (
                  <img src={preview} className="object-cover object-center w-[132px] h-[132px] rounded-full" />
                ) : (
                  <DownloadIcon className="w-8 h-8 text-text-grey-dark" />
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
              <div className="flex items-center gap-3  mb-[15px]">
                <h3 className="text-h3">Персональная информация</h3>
              </div>
              <div className="bg-white flex flex-col">
                <label className="flex flex-col">
                  <span className="text-xxs text-text-grey-dark">Фамилия</span>
                  <Input
                    type="text"
                    variant="text"
                    placeholder="Фамилия"
                    aria-invalid={!!errors.personalInfo?.surname}
                    {...register('personalInfo.surname', {
                      required: 'Введите фамилию',
                      minLength: {
                        value: 2,
                        message: 'Фамилия должна быть введена'
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
          <div className="bg-white p-[18px_40px_20px] rounded-md">
            <div className="grid grid-cols-2 gap-x-[50px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-[7px]">
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

                  <label className="flex flex-col gap-[3px]">
                    <span className="text-xxs text-text-grey-dark">Место проживания</span>
                    <Input
                      type="text"
                      variant="text"
                      placeholder="Город"
                      aria-invalid={!!errors.contactInfo?.city}
                      {...register('contactInfo.city', {
                        required: 'Введите город',
                        minLength: 2,
                        pattern: {
                          value: /^[А-Яа-яЁё]+$/u,
                          message: 'Город может содержать только буквы'
                        },
                        onChange: () => {
                          if (errors.contactInfo?.city) {
                            clearErrors('contactInfo.city')
                          }
                        }
                      })}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-[7px]">
                  <h3 className="text-h3">Должностная информация</h3>
                </div>
                <div className="flex flex-col mt-[8px] gap-[12px]">
                  <Controller
                    name="jobInfo.departmentId"
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
                    name="accessLevel.roleId"
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
                      </label>
                    )}
                  />

                  <Controller
                    name="jobInfo.chief"
                    control={control}
                    rules={{ required: 'Выберите руководителя' }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <label className="flex flex-col gap-[3px]">
                        <span className="text-xxs text-text-grey-dark">Начальник</span>
                        <Select
                          placeholder="Начальник"
                          options={chief.map(d => ({
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
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols gap-[20px]">
            <div className="bg-white p-[18px_20px_20px] rounded-md flex flex-col gap-[10px]">
              <div className="flex items-center gap-3 col-span-2 ml-[5px] mb-[7px] ">
                <UserCreateIcon className="w-4 h-4 color-grey-dark" />
                <h3 className="text-h3">Уровень доступа</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-[100px] gap-y-[42px]">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between gap-[4px] border-b border-grey-light pb-1"
                  >
                    <div>
                      <div className="mb-[4px] text-xs color-text">{role.name}</div>
                      <div className="text-xxs color-text">{role.description}</div>
                    </div>

                    <Switch
                      checked={roleId === role.id}
                      onChange={() => {
                        setValue('accessLevel.roleId', role.id)
                        clearErrors('accessLevel.roleId')
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-[18px]">
            <Button
              label="Отменить"
              variant="secondary"
              type="button"
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
