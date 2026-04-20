import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, type TProjectSchema } from './projectModalSchema'
import { Button, Input, Modal, Switch } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { FormItem } from './ui/FormItem'
import { ImagePickerWithCrop } from './ui/ImagePickerWithCrop'

export type TFormData = TProjectSchema

interface SpecialProjectModalProps {
  onSubmit: (data: TFormData) => void
  onClose: () => void
  isOpen: boolean
  initialData?: TFormData
  modalTitle?: string
  isPending?: boolean
}

export function SpecialProjectModal({
  onSubmit,
  initialData,
  isOpen = false,
  onClose,
  modalTitle,
  isPending
}: SpecialProjectModalProps) {
  const getDefaultData = (): TFormData => ({
    id: uuidv4(),
    title: '',
    description: '',
    isActive: false,
    image: ''
  })

  const methods = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || getDefaultData()
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, errors }
  } = methods

  const [checkCropping, setCheckCropping] = useState(false)

  const isSaveDisabled = (!isDirty && initialData && 'id' in initialData) || isPending

  const handleFormSubmit = (data: TFormData) => {
    const isCropping = checkCropping

    if (isCropping) {
      setError('root.croppingInProgress', {
        type: 'manual',
        message: 'Завершите обрезку изображения перед сохранением'
      })
      return
    }

    onSubmit?.(data)
  }

  useEffect(() => {
    if (isOpen) {
      reset(initialData || getDefaultData())
    }
  }, [initialData, isOpen, reset])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      footer={
        <div className="flex justify-between w-full">
          <Button type="button" label="Отмена" variant="secondary" size="default" onClick={onClose} />
          <Button
            type="submit"
            label={isPending ? 'Сохранение...' : 'Сохранить'}
            variant="primary"
            size="default"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSaveDisabled}
          />
        </div>
      }
    >
      <FormProvider {...methods}>
        <form className={cn('flex flex-col gap-4')}>
          <div className="flex items-center justify-end -mb-4">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex items-center gap-3"
                    labelSetting={{
                      text: 'Активен'
                    }}
                  >
                    <Switch {...field} checked={field.value} />
                  </FormItem>
                )
              }}
            />
          </div>
          <FormItem
            className="flex flex-col gap-1"
            labelSetting={{
              text: 'Заголовок',
              id: 'spec-title'
            }}
            errorMessage={errors.title?.message}
          >
            <Input {...register('title')} placeholder="Текст" id="spec-title" invalid={!!errors.title} />
          </FormItem>
          <FormItem
            labelSetting={{ text: 'Описание', id: 'spec-description' }}
            errorMessage={errors.description?.message}
          >
            <Input
              {...register('description')}
              placeholder="Текст"
              id="spec-description"
              invalid={!!errors.description}
            />
          </FormItem>
          <div className="px-6">
            <ImagePickerWithCrop
              name="image"
              getIsCropping={setCheckCropping}
              previewImg={initialData?.image || undefined}
            />
          </div>
          {errors.root?.croppingInProgress && (
            <div className="flex items-center justify-center">
              <span className="text-xxs text-text-error">{errors.root.croppingInProgress.message}</span>
            </div>
          )}
        </form>
      </FormProvider>
    </Modal>
  )
}
