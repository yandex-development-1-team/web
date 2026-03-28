import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CalendarInput, Input, Modal, Switch, TimeRangeInput } from '@/components/ui'
import { FormInput } from './ui'
import { AddIcon } from '@/assets/icons'
import { cn } from '@/lib/utils.clsx'
import { fileToBase64 } from '@/lib/fileUtils/fileToBase64'
import { FORM_TO_API_KEYS, getFormValues, mapFormDataToBoxData } from './helpers'
import { boxSolutionSchema } from './schema'
import type { BoxSolutionFormData, BoxSolutionModalType } from './BoxSolutionModal.type'
import type { BoxData } from '@/types/solutions'

export const BoxSolutionModal = ({ isOpen, onClose, boxData, onSave }: BoxSolutionModalType) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, dirtyFields }
  } = useForm<BoxSolutionFormData>({
    defaultValues: getFormValues(boxData),
    resolver: zodResolver(boxSolutionSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'timeSlots'
  })

  const imageFileList = useWatch({
    control,
    name: 'image'
  })

  const imagePreviewUrl =
    imageFileList && imageFileList.length > 0 ? URL.createObjectURL(imageFileList[0]) : boxData?.image

  const onSubmit = async (data: BoxSolutionFormData) => {
    let imageBase64: string | undefined = undefined

    if (data.image && data.image.length > 0) {
      imageBase64 = await fileToBase64(data.image[0])
    } else if (boxData?.image) {
      imageBase64 = boxData.image
    }

    const fullData: Omit<BoxData, 'id'> = mapFormDataToBoxData(data, imageBase64)

    if (boxData) {
      const changed = Object.entries(dirtyFields).reduce(
        (acc, [formKey, isDirty]) => {
          const apiKey = FORM_TO_API_KEYS[formKey as keyof BoxSolutionFormData]

          if (!apiKey || !isDirty) return acc

          return {
            ...acc,
            [apiKey]: fullData[apiKey]
          }
        },
        {} as Partial<Omit<BoxData, 'id'>>
      )

      onSave(changed)
    } else {
      onSave(fullData)
    }
  }

  const handleAddTimeSlot = () => {
    append({
      date: undefined,
      timeRange: undefined
    })
  }

  const displayFields = fields.length > 0 ? fields : [{ id: 'empty' }]
  const hasMultipleSlots = fields.length > 1

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${!boxData ? 'Создать' : 'Редактировать'} коробочное решение`}
      footer={
        <div className="flex justify-between w-full">
          <Button type="button" label="Отмена" variant="secondary" size="default" onClick={onClose} />
          <Button type="submit" label="Сохранить" variant="primary" size="default" onClick={handleSubmit(onSubmit)} />
        </div>
      }
    >
      <form className="flex flex-col gap-[14px]" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <div className="flex gap-[12px] items-center py-[4px] justify-self-end self-start">
            <span className="text-h5">Активно</span>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
            />
          </div>

          <FormInput
            label="Название"
            errorMessage={errors.name?.message}
            input={<Input type="text" variant="text" aria-invalid={!!errors.name} {...register('name')} />}
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[4px]">
            {displayFields.map((field, index) => {
              const dateLabel = hasMultipleSlots ? `Дата ${index + 1}` : 'Дата'
              const timeLabel = hasMultipleSlots ? `Время ${index + 1}` : 'Время'

              return (
                <div key={field.id} className="flex items-start gap-y-[16px] gap-x-[12px]">
                  <FormInput
                    label={dateLabel}
                    labelClassName="flex-1"
                    input={
                      <Controller
                        name={`timeSlots.${index}.date`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-col gap-[3px]">
                            <CalendarInput
                              key={`date-${index}-${isOpen}`}
                              variant="single"
                              value={field.value}
                              placeholder="Выберите дату"
                              onChange={field.onChange}
                              invalid={!!errors.timeSlots?.[index]?.date}
                            />
                            <span className="text-xxs text-text-error">{errors.timeSlots?.[index]?.date?.message}</span>
                          </div>
                        )}
                      />
                    }
                  />

                  <FormInput
                    label={timeLabel}
                    labelClassName="flex-1"
                    input={
                      <Controller
                        name={`timeSlots.${index}.timeRange`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex flex-col gap-[3px]">
                            <TimeRangeInput
                              value={field.value}
                              onChange={field.onChange}
                              className="flex-1"
                              invalid={!!errors.timeSlots?.[index]?.timeRange}
                            />
                            <span className="text-xxs text-text-error">
                              {errors.timeSlots?.[index]?.timeRange?.message}
                            </span>
                          </div>
                        )}
                      />
                    }
                  />

                  {hasMultipleSlots && (
                    <Button
                      size="icon-44"
                      type="button"
                      variant="secondary"
                      onClick={() => remove(index)}
                      className="mt-[21px] border-(--input-border) hover:border-(--input-border-active)"
                    >
                      <div className="w-[16px] h-[1px] bg-black" />
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          <Button
            type="button"
            onClick={handleAddTimeSlot}
            variant="secondary"
            size="default"
            className={cn(
              'self-start px-[12px] border-none',
              'shadow-[0px_1px_3px_0px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.30)]',
              'hover:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.18),0px_3px_6px_0px_rgba(0,0,0,0.33)]',
              'hover:-translate-y-px',
              'active:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.20),inset_0px_1px_2px_0px_rgba(0,0,0,0.15)]',
              'active:translate-y-0',
              'transition-all duration-200 ease-in-out'
            )}
          >
            <AddIcon className="size-[24px] mr-[4px]" />
            Добавить дату и время
          </Button>
        </div>

        <div className="flex flex-col gap-[7px]">
          <FormInput
            label="Место"
            errorMessage={errors.location?.message}
            input={<Input type="text" variant="text" aria-invalid={!!errors.location} {...register('location')} />}
          />

          <FormInput
            label="Описание"
            errorMessage={errors.description?.message}
            input={
              <Input type="text" variant="text" aria-invalid={!!errors.description} {...register('description')} />
            }
          />

          <FormInput label="Правила" input={<Input type="text" variant="text" {...register('rules')} />} />

          <div className="flex gap-[12px]">
            <FormInput
              label="Стоимость (руб.)"
              labelClassName="flex-1"
              errorMessage={errors.cost?.message}
              input={<Input type="text" variant="text" aria-invalid={!!errors.cost} {...register('cost')} />}
            />

            <FormInput
              label="Организатор"
              labelClassName="flex-1"
              errorMessage={errors.organizer?.message}
              input={<Input type="text" variant="text" aria-invalid={!!errors.organizer} {...register('organizer')} />}
            />
          </div>
        </div>

        <div>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    onChange(e.target.files)
                  }
                }}
                {...field}
                value={undefined}
              />
            )}
          />
          <div
            className={cn(
              'flex gap-[12px] items-center',
              !imagePreviewUrl && `justify-center py-[23px] bg-grey-extra-light border border-grey-light rounded-[8px]`
            )}
          >
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Preview" className="w-[296px] h-[141px] object-contain rounded-[8px]" />
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
