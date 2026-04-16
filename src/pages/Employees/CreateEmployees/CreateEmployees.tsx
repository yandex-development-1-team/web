import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { Button, Card, Input, Switch } from '@/components/ui'
import { FormInput } from '../ui'
import { DownloadIcon, UserCreateIcon } from '@/assets/icons'
import { useNotification } from '@/app/providers/notification'
import { roles } from './createEmployeesData'
import type { IEmployeeFormData } from './CreateEmployees.types'

const MAX_FILE_SIZE = 5 * 1024 * 1024

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

    if (file.size > MAX_FILE_SIZE) {
      showNotification({ message: 'Максимум 5MB', status: 'error' })
      return
    }

    setValue('photo', file)

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onCancel = () => {
    reset()
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
    navigate(-1)
  }

  const onSubmit: SubmitHandler<IEmployeeFormData> = data => {
    if (!data.accessLevel?.roleId) {
      showNotification({ message: 'Выберите уровень доступа', status: 'error' })
      return
    }
    console.log(data)
    navigate('/employees')
  }

  return (
    <>
      <Card>
        <h2 className="text-h2 text-text-black-dark">Добавить сотрудника</h2>
      </Card>
      <div className="mt-[12px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-[20px]">
          <div className="grid grid-cols-[250px_1fr] gap-[20px]">
            <Card className="py-[20px] flex flex-col items-center justify-center">
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
            </Card>

            <Card className="flex flex-col gap-[19px]">
              <h3 className="text-h3">Персональная информация</h3>
              <div className="flex flex-col gap-[11px]">
                <FormInput
                  label="Фамилия"
                  errorMessage={errors.personalInfo?.surname?.message}
                  input={
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
                  }
                />

                <FormInput
                  label="Имя"
                  errorMessage={errors.personalInfo?.firstName?.message}
                  input={
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
                  }
                />

                <FormInput
                  label="Отчество"
                  errorMessage={errors.personalInfo?.patronymic?.message}
                  input={
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
                  }
                />
              </div>
            </Card>
          </div>

          <Card>
            <div className="grid grid-cols-2 gap-x-[49px] px-[20px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-h3">Контактная информация</h3>

                <div className="flex flex-col gap-[11px] max-w-[352px]">
                  <FormInput
                    label="Номер телефона"
                    errorMessage={errors.contactInfo?.phone?.message}
                    input={
                      <Input
                        type="tel"
                        variant="text"
                        placeholder="+7 999 999-66-77"
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
                    }
                  />

                  <FormInput
                    label="Email"
                    errorMessage={errors.contactInfo?.email?.message}
                    input={
                      <Input
                        type="email"
                        variant="text"
                        placeholder="Email"
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
                    }
                  />

                  <FormInput
                    label="Место проживания"
                    errorMessage={errors.contactInfo?.city?.message}
                    input={
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
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[20px]">
                <h3 className="text-h3">Должностная информация</h3>
                <div className="flex flex-col gap-[11px]">
                  <FormInput
                    label="Отдел"
                    errorMessage={errors.jobInfo?.departmentId?.message}
                    input={
                      <Input
                        type="text"
                        variant="text"
                        placeholder="Отдел"
                        aria-invalid={!!errors.jobInfo?.departmentId}
                        {...register('jobInfo.departmentId', {
                          required: 'Введите название отдела',
                          minLength: 2,
                          pattern: {
                            value: /^[А-Яа-яЁё]+$/u,
                            message: 'Название отдела может содержать только буквы'
                          },
                          onChange: () => {
                            if (errors.jobInfo?.departmentId) {
                              clearErrors('jobInfo.departmentId')
                            }
                          }
                        })}
                      />
                    }
                  />

                  <FormInput
                    label="Должность"
                    errorMessage={errors.jobInfo?.position?.message}
                    input={
                      <Input
                        type="text"
                        variant="text"
                        placeholder="Должность"
                        aria-invalid={!!errors.jobInfo?.position}
                        {...register('jobInfo.position', {
                          required: 'Введите должность',
                          minLength: 2,
                          pattern: {
                            value: /^[А-Яа-яЁё]+$/u,
                            message: 'Должность может содержать только буквы'
                          },
                          onChange: () => {
                            if (errors.jobInfo?.position) {
                              clearErrors('jobInfo.position')
                            }
                          }
                        })}
                      />
                    }
                  />

                  <FormInput
                    label="Начальник"
                    errorMessage={errors.jobInfo?.chief?.message}
                    input={
                      <Input
                        type="text"
                        variant="text"
                        placeholder="Начальник"
                        aria-invalid={!!errors.jobInfo?.chief}
                        {...register('jobInfo.chief', {
                          required: 'Введите ФИО руководителя',
                          minLength: 2,
                          pattern: {
                            value: /^[А-Яа-яЁё]+$/u,
                            message: 'ФИО руководителя может содержать только буквы'
                          },
                          onChange: () => {
                            if (errors.jobInfo?.chief) {
                              clearErrors('jobInfo.chief')
                            }
                          }
                        })}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols gap-[20px]">
            <Card className="py-[20px] flex flex-col gap-[11px]">
              <div className="flex items-center gap-3 col-span-2 ml-[5px] mb-[7px]">
                <UserCreateIcon className="w-4 h-4 text-text" />
                <h3 className="text-h3 text-text">Уровень доступа</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-[100px] gap-y-[42px]">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between gap-[4px] border-b border-grey-light pb-1"
                  >
                    <div>
                      <div className="mb-[4px] text-xs text-text">{role.name}</div>
                      <div className="text-xxs text-text">{role.description}</div>
                    </div>

                    <Switch
                      checked={roleId === role.id}
                      onChange={() => {
                        setValue('accessLevel.roleId', role.id)
                        clearErrors('accessLevel.roleId')
                      }}
                      paleStyle={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </form>
        <div className="flex justify-end gap-[11px] mt-[12px]">
          <Button label="Отменить" variant="secondary" type="button" size="default" onClick={onCancel} />
          <Button label="Сохранить" type="submit" size="default" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </>
  )
}

export const Component = CreateEmployees
