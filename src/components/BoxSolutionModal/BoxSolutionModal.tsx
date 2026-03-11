import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, CalendarInput, Input, Modal, Select, Switch, TimeRangeInput } from '@/components/ui'
import { AddIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import type { BoxSolutionFormData, BoxSolutionModalType, ModalAction } from './BoxSolutionModal.type'
import type { BoxData } from '@/types/solutions'
import { mockSelectOptions } from '@/mockData/mockSelectOptions'
import { formatDateToISO, parseToDate } from '@/lib/utils.date'

export const BoxSolutionModal = ({ isOpen, onClose, action, boxData, onSave }: BoxSolutionModalType) => {
  const getFormValues = (action: ModalAction, boxData?: BoxData): BoxSolutionFormData => {
    if (action === 'edit' && boxData) {
      const formattedDate = boxData.date ? boxData.date.split('-').reverse().join('.') : undefined

      return {
        name: boxData.name,
        isActive: boxData.isActive,
        date: formattedDate ? parseToDate(formattedDate) : undefined,
        timeRange: {
          from: boxData.startTime,
          to: boxData.endTime
        },
        location: boxData.location || mockSelectOptions[0]?.value || '',
        description: boxData.description || '',
        rules: boxData.rules || '',
        cost: boxData.cost || '',
        organizer: boxData.organizer || '',
        image: null
      }
    }

    return {
      name: '',
      isActive: false,
      date: undefined,
      timeRange: undefined,
      location: mockSelectOptions[0]?.value || '',
      description: '',
      rules: '',
      cost: '',
      organizer: '',
      image: null
    }
  }

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    clearErrors,
    watch
  } = useForm<BoxSolutionFormData>({
    defaultValues: getFormValues(action, boxData)
  })

  const imageFileList = watch('image')

  const imagePreviewUrl =
    imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : boxData?.image

  useEffect(() => {
    const values = getFormValues(action, boxData)
    reset(values, { keepDefaultValues: false })
  }, [isOpen, action, boxData, reset])

  const onSubmit = async (data: BoxSolutionFormData) => {
    let imageBase64: string | undefined = undefined

    if (data.image && data.image.length > 0) {
      const file = data.image[0]
      imageBase64 = await new Promise<string>(resolve => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    } else if (boxData?.image) {
      imageBase64 = boxData.image
    }

    const formattedData: Omit<BoxData, 'id'> = {
      name: data.name,
      isActive: data.isActive,
      date: formatDateToISO(data.date),
      startTime: data.timeRange?.from,
      endTime: data.timeRange?.to,
      location: data.location,
      description: data.description,
      rules: data.rules,
      cost: data.cost,
      organizer: data.organizer,
      image: imageBase64
    }

    onSave(formattedData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${action === 'create' ? 'Создать' : 'Редактировать'} коробочное решение`}
      footer={
        <div className="flex justify-between w-full">
          <Button type="button" label="Отмена" variant="secondary" size="default" onClick={onClose} />
          <Button type="submit" label="Сохранить" variant="primary" size="default" onClick={handleSubmit(onSubmit)} />
        </div>
      }
    >
      <form
        className="flex flex-col gap-[16px]"
        onSubmit={handleSubmit(onSubmit)}
        onBlur={e => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            clearErrors()
          }
        }}
        noValidate
      >
        <div className="grid grid-cols-2 gap-y-[16px] gap-x-[12px]">
          <label className="flex flex-col gap-[3px]">
            <span className="text-xxs text-text-grey-dark">Название</span>
            <Input
              type="text"
              variant="text"
              aria-invalid={!!errors.name}
              {...register('name', {
                required: 'Введите название',
                minLength: {
                  value: 2,
                  message: 'Название должно содержать минимум 2 символа'
                },
                onChange: () => {
                  if (errors.name) {
                    clearErrors('name')
                  }
                }
              })}
            />
            <span className="text-xxs text-text-error">{errors.name?.message}</span>
          </label>

          <div className="flex gap-[12px] items-center pt-[4px] pr-[22px] justify-self-end self-start">
            <span className="text-h5">Активно</span>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
            />
          </div>

          <Controller
            name="date"
            control={control}
            rules={{
              required: 'Выберите дату'
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-[3px]">
                <CalendarInput
                  key={`date-${isOpen}`}
                  variant="single"
                  value={field.value}
                  placeholder="Выберите дату"
                  onChange={date => {
                    field.onChange(date)
                    if (errors.date) {
                      clearErrors('date')
                    }
                  }}
                  invalid={!!errors.date}
                />
                <span className="text-xxs text-text-error">{errors.date?.message}</span>
              </div>
            )}
          />
          <Controller
            name="timeRange"
            control={control}
            rules={{
              required: 'Выберите время',
              validate: value => {
                if (!value?.from || !value?.to) {
                  return 'Укажите время начала и окончания'
                }
                return true
              }
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-[3px]">
                <TimeRangeInput
                  value={field.value}
                  onChange={time => {
                    field.onChange(time)
                    if (errors.timeRange) {
                      clearErrors('timeRange')
                    }
                  }}
                  className="flex-1"
                  invalid={!!errors.timeRange}
                />
                <span className="text-xxs text-text-error">{errors.timeRange?.message}</span>
              </div>
            )}
          />
        </div>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Место</span>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                options={mockSelectOptions}
                placeholder="Выберите место"
                classNames={{ trigger: 'w-full' }}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </label>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Описание</span>
          <Input
            type="text"
            variant="text"
            aria-invalid={!!errors.description}
            {...register('description', {
              required: 'Введите описание',
              onChange: () => {
                if (errors.name) {
                  clearErrors('description')
                }
              }
            })}
          />
          <span className="text-xxs text-text-error">{errors.description?.message}</span>
        </label>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Правила</span>
          <Input type="text" variant="text" {...register('rules')} />
        </label>

        <div className="flex gap-[12px]">
          <label className="flex flex-col gap-[3px] flex-1">
            <span className="text-xxs text-text-grey-dark">Стоимость</span>
            <Input
              type="text"
              variant="text"
              aria-invalid={!!errors.cost}
              {...register('cost', {
                required: 'Введите стоимость',
                onChange: () => {
                  if (errors.cost) {
                    clearErrors('cost')
                  }
                }
              })}
            />
            <span className="text-xxs text-text-error">{errors.cost?.message}</span>
          </label>
          <label className="flex flex-col gap-[3px] flex-1">
            <span className="text-xxs text-text-grey-dark">Организатор</span>
            <Input type="text" variant="text" {...register('organizer')} />
          </label>
        </div>

        <div>
          <input type="file" id="image-upload" accept="image/*" className="hidden" {...register('image')} />
          <div
            className={cn(
              'flex gap-[12px] items-center',
              !imagePreviewUrl && `justify-center py-[23px] bg-grey-extra-light border border-grey-light rounded-[8px]`
            )}
          >
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Preview" className="w-[296px] h-[141px] object-cover rounded-[8px]" />
            )}
            <div className="flex gap-[20px] items-center">
              <Button size="icon-48" type="button" onClick={() => document.getElementById('image-upload')?.click()}>
                <AddIcon className="size-full" />
              </Button>
              <span className="text-xs">Загрузить изображение</span>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}
