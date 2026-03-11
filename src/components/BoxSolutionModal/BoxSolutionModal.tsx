import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, CalendarInput, Input, Modal, Select, Switch, TimeRangeInput } from '@/components/ui'
import { AddIcon } from '@/assets/icons'
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
        timeRange:
          boxData.startTime && boxData.endTime
            ? {
                from: boxData.startTime,
                to: boxData.endTime
              }
            : undefined,
        location: boxData.location || '',
        description: boxData.description || '',
        rules: boxData.rules || '',
        cost: boxData.cost || '',
        organizer: boxData.organizer || ''
      }
    }

    return {
      name: '',
      isActive: false,
      date: undefined,
      timeRange: undefined,
      location: '',
      description: '',
      rules: '',
      cost: '',
      organizer: ''
    }
  }

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    clearErrors
  } = useForm<BoxSolutionFormData>({
    defaultValues: getFormValues(action, boxData)
  })

  useEffect(() => {
    const values = getFormValues(action, boxData)
    reset(values, { keepDefaultValues: false })
  }, [isOpen, action, boxData, reset])

  const onSubmit = (data: BoxSolutionFormData) => {
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
      organizer: data.organizer
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
            render={({ field }) => (
              <CalendarInput
                key={`date-${isOpen}`}
                variant="single"
                value={field.value}
                placeholder="Выберите дату"
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="timeRange"
            control={control}
            render={({ field }) => <TimeRangeInput value={field.value} onChange={field.onChange} className="flex-1" />}
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
          <Input type="text" variant="text" {...register('description')} />
        </label>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Правила</span>
          <Input type="text" variant="text" {...register('rules')} />
        </label>

        <div className="flex gap-[12px]">
          <label className="flex flex-col gap-[3px] flex-1">
            <span className="text-xxs text-text-grey-dark">Стоимость</span>
            <Input type="text" variant="text" {...register('cost')} />
          </label>
          <label className="flex flex-col gap-[3px] flex-1">
            <span className="text-xxs text-text-grey-dark">Организатор</span>
            <Input type="text" variant="text" {...register('organizer')} />
          </label>
        </div>

        <div
          className="flex gap-[12px] justify-center items-center py-[23px] 
          bg-grey-extra-light border border-grey-light rounded-[8px] text-xs"
        >
          <Button size="icon-48">
            <AddIcon className="size-full" />
          </Button>
          <span className="text-xs">Загрузить изображение</span>
        </div>
      </form>
    </Modal>
  )
}
