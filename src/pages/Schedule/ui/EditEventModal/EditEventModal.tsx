import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CalendarInput, Input, Modal, TimeRangeInput } from '@/components/ui'
import { useEffect } from 'react'
import type { IEditEventModal, FormFieldConfig } from './EditEventModal.typs'
import { formatDate, parseToDate } from '@/lib/utils.date'
import { eventFormSchema, type FormFields } from '@/pages/Schedule/ui/EditEventModal/schemas/EditEventModal.schema'

const formFields: FormFieldConfig[] = [
  { name: 'box_name', label: 'Название бокса', placeholder: 'Введите название бокса', type: 'text' },
  { name: 'date', label: 'Дата', placeholder: 'Введите дату', type: 'date' },
  { name: 'time', label: 'Время', placeholder: 'Введите время', type: 'time' },
  { name: 'total_slots', label: 'Всего слотов', placeholder: 'Введите количество слотов', type: 'number' },
  { name: 'location', label: 'Локация', placeholder: 'Введите название локации', type: 'text' }
]

export const EditEventModal = ({ defaultValue, onSaveForm, isOpen, onClose }: IEditEventModal) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<FormFields>({
    defaultValues: defaultValue,
    resolver: zodResolver(eventFormSchema),
    mode: 'onChange'
  })

  const dateValue = useWatch({
    control,
    name: 'date'
  })

  const timeValue = useWatch({
    control,
    name: 'time'
  })

  useEffect(() => {
    if (isOpen && defaultValue) {
      reset(defaultValue)
    }
  }, [isOpen, defaultValue, reset])

  const onSubmit = (data: FormFields) => {
    onSaveForm(data)
    onClose()
  }

  const handleClose = () => {
    reset(defaultValue)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Редактировать событие">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {formFields.map(({ name, label, type, placeholder }) => {
          if (name === 'date') {
            return (
              <label key={name} className="flex flex-col gap-0.75">
                <span className="text-xxs text-text-grey-dark">{label}</span>
                <CalendarInput
                  variant="single"
                  value={dateValue ? parseToDate(dateValue) : undefined}
                  placeholder={placeholder}
                  onChange={value => {
                    setValue('date', formatDate(value), {
                      shouldDirty: true,
                      shouldValidate: true
                    })
                  }}
                />
                {errors.date && <span className="text-xs text-text-error mt-0.5">{errors.date.message}</span>}
              </label>
            )
          }

          if (name === 'time') {
            return (
              <label key={name} className="flex flex-col gap-0.75">
                <span className="text-xxs text-text-grey-dark">{label}</span>
                <TimeRangeInput
                  value={timeValue}
                  onChange={value =>
                    setValue('time', value ?? { from: '', to: '' }, { shouldDirty: true, shouldValidate: true })
                  }
                  placeholder={placeholder}
                  className={errors.time ? 'border-text-error' : ''}
                />
                {errors.time && typeof errors.time.message === 'string' && (
                  <span className="text-xs text-text-error mt-0.5">{errors.time.message}</span>
                )}
              </label>
            )
          }

          const registerOptions = name === 'total_slots' ? { valueAsNumber: true } : {}

          return (
            <label key={name} className="flex flex-col gap-0.75">
              <span className="text-xxs text-text-grey-dark">{label}</span>
              <Input
                type={type}
                placeholder={placeholder}
                {...register(name, registerOptions)}
                className={`w-full ${errors[name] ? 'border-text-error' : ''}`}
              />
              {errors[name] && (
                <span className="text-xs text-text-error mt-0.5">
                  {typeof errors[name]?.message === 'string' ? errors[name].message : 'Ошибка валидации'}
                </span>
              )}
            </label>
          )
        })}

        <div className="flex gap-3 self-end">
          <Button
            type="button"
            onClick={handleClose}
            label="Отменить"
            variant="secondary"
            size="default"
            className="w-49"
          />
          <Button type="submit" label="Сохранить" size="default" className="w-49" disabled={!isDirty || !isValid} />
        </div>
      </form>
    </Modal>
  )
}
