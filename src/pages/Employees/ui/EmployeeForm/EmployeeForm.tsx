import { useRef, useState } from 'react'
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Input, Switch } from '@/components/ui'
import { FormInput } from '../FormInput/FormInput'
import { DownloadIcon, UserCreateIcon } from '@/assets/icons'
import { useNotification } from '@/app/providers/notification'
import { roles } from './roles'
import { employeeFormSchema, type EmployeeFormData } from '../../schema'
import type { EmployeeFormType } from './EmployeeForm.types'

export const EmployeeForm = ({ initialData, initialPreview = null, onSubmit, onCancel, title }: EmployeeFormType) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(initialPreview)
  const [hasNewImage, setHasNewImage] = useState<boolean>(false)
  const { showNotification } = useNotification()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialData || {
      photo: null,
      personalInfo: { surname: '', firstName: '', patronymic: '' },
      contactInfo: { phone: '', email: '', city: '' },
      jobInfo: { department: '', position: '', chief: '' },
      accessLevel: { roleId: null }
    }
  })

  const roleId = useWatch({ control, name: 'accessLevel.roleId' })

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showNotification({ message: 'Максимум 5MB', status: 'error' })
      return
    }

    setValue('photo', file)
    setHasNewImage(true)

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleCancel = () => {
    reset()

    setPreview(initialPreview)
    setHasNewImage(false)

    if (fileRef.current) fileRef.current.value = ''
    onCancel()
  }

  const handleFormSubmit: SubmitHandler<EmployeeFormData> = async data => {
    if (!data.accessLevel?.roleId && data.accessLevel?.roleId !== 0) {
      showNotification({ message: 'Выберите уровень доступа', status: 'error' })
      return
    }
    await onSubmit(data, hasNewImage)
  }

  return (
    <>
      <Card>
        <h2 className="text-h2 text-text-black-dark">{title}</h2>
      </Card>
      <div className="mt-[12px]">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 flex flex-col gap-[20px]">
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
                      {...register('personalInfo.surname')}
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
                      {...register('personalInfo.firstName')}
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
                      {...register('personalInfo.patronymic')}
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
                        {...register('contactInfo.phone')}
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
                        {...register('contactInfo.email')}
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
                        {...register('contactInfo.city')}
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
                    errorMessage={errors.jobInfo?.department?.message}
                    input={
                      <Input
                        type="text"
                        variant="text"
                        placeholder="Отдел"
                        aria-invalid={!!errors.jobInfo?.department}
                        {...register('jobInfo.department')}
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
                        {...register('jobInfo.position')}
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
                        {...register('jobInfo.chief')}
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
          <Button label="Отменить" variant="secondary" type="button" size="default" onClick={handleCancel} />
          <Button label="Сохранить" type="submit" size="default" onClick={handleSubmit(handleFormSubmit)} />
        </div>
      </div>
    </>
  )
}
