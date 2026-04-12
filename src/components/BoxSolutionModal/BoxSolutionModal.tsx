import { AddIcon } from '@/assets/icons'
import { Button, CalendarInput, ImageCropper, Input, Modal, Switch, TimeRangeInput } from '@/components/ui'
import { fileToBase64 } from '@/lib/fileUtils/fileToBase64'
import { cn } from '@/lib/utils.clsx'
import type { BoxData } from '@/types/solutions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import type { BoxSolutionFormData, BoxSolutionModalType } from './BoxSolutionModal.type'
import { FORM_TO_API_KEYS, getFormValues, mapFormDataToBoxData } from './helpers'
import { useSolution } from './hooks/useSolution'
import { boxSolutionSchema } from './schema'
import { FormInput } from './ui'

export const BoxSolutionModal = ({ isOpen, onClose, boxData, boxId = null, onSave }: BoxSolutionModalType) => {
  const { parsedFormData } = useSolution(boxId)
  const {
    control,
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors, dirtyFields }
  } = useForm<BoxSolutionFormData>({
    values: getFormValues(parsedFormData),
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

  const [cropImage, setCropImage] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState(false)

  const imagePreviewUrl = (() => {
    if (imageFileList && imageFileList.length > 0) {
      return URL.createObjectURL(imageFileList[0])
    }
    return boxData?.image || null
  })()

  const onSubmit = async (data: BoxSolutionFormData) => {
    if (isCropping) {
      setError('root.croppingInProgress', {
        type: 'manual',
        message: 'Завершите обрезку изображения перед сохранением'
      })
      return
    }

    let imageBase64: string | undefined = undefined

    if (data.image && data.image.length > 0) {
      imageBase64 = await fileToBase64(data.image[0])
    } else if (boxData?.image) {
      imageBase64 = boxData.image
    }

    const fullData = mapFormDataToBoxData(data, imageBase64)

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

      if (data.image && data.image.length > 0 && !changed.image) {
        changed.image = imageBase64
      }

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
                      className="mt-[21px] border-system-grey-light hover:bg-grey-extra-light 
                        hover:border-system-grey-light active:border-system-grey-light"
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
            variant="elevated"
            size="default"
            leftIcon={<AddIcon className="size-[24px] mr-[4px]" />}
            className="self-start px-[12px]"
            label="Добавить дату и время"
          />
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
            render={() => (
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0]
                    const url = URL.createObjectURL(file)

                    setCropImage(url)
                    setIsCropping(true)
                    clearErrors('root.croppingInProgress')

                    e.target.value = ''
                  }
                }}
              />
            )}
          />
          <div
            className={cn(
              'flex gap-[12px] items-start',
              !isCropping &&
                !cropImage &&
                !imagePreviewUrl &&
                `justify-center py-[23px] bg-grey-extra-light border border-grey-light rounded-[8px]`
            )}
          >
            {isCropping && cropImage ? (
              <ImageCropper
                image={cropImage}
                containerWidth={296}
                containerHeight={141}
                aspect={296 / 141}
                onCancel={() => {
                  setIsCropping(false)
                  setCropImage(null)
                  clearErrors('root.croppingInProgress')
                }}
                onComplete={file => {
                  const dataTransfer = new DataTransfer()
                  dataTransfer.items.add(file)

                  setValue('image', dataTransfer.files, {
                    shouldDirty: true,
                    shouldValidate: true
                  })

                  setIsCropping(false)
                  setCropImage(null)
                  clearErrors('root.croppingInProgress')
                }}
              />
            ) : (
              imagePreviewUrl && (
                <img src={imagePreviewUrl} alt="Preview" className="w-[296px] h-[141px] object-contain rounded-[8px]" />
              )
            )}
            <div
              className={cn(
                'flex gap-[20px] items-center',
                (isCropping || imagePreviewUrl) && 'px-[12px] h-[141px] w-full border border-grey-light rounded-[8px]'
              )}
            >
              <Button
                size="icon-48"
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={isCropping}
              >
                <AddIcon className="size-full" />
              </Button>
              <span className="text-xs">Загрузить изображение</span>
            </div>
          </div>

          {errors.root?.croppingInProgress && (
            <span className="text-xxs text-text-error">{errors.root.croppingInProgress.message}</span>
          )}
        </div>
      </form>
    </Modal>
  )
}
