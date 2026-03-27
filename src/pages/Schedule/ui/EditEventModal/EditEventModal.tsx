import { useForm, useWatch } from 'react-hook-form'
import { Button, CalendarInput, Input, Modal, TimeRangeInput } from '@/components/ui'
import { useEffect } from 'react'
import type { IEditEventModal, FormFields, FormFieldConfig } from './EditEventModal.typs'
import { formatDate, parseToDate } from '@/lib/utils.date'

const formFields: FormFieldConfig[] = [
  { name: 'box_name', label: 'Название бокса', type: 'text' },
  { name: 'date', label: 'Дата', type: 'date' },
  { name: 'time', label: 'Время', type: 'time' },
  { name: 'total_slots', label: 'Всего слотов', type: 'number' },
  { name: 'location', label: 'Локация', type: 'text' }
]

export const EditEventModal = ({ defaultValue, onSaveForm, isOpen, onClose }: IEditEventModal) => {
  const { register, handleSubmit, reset, setValue, control } = useForm<FormFields>({
    defaultValues: defaultValue
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
        {formFields.map(({ name, label, type }) => {
          if (name === 'date') {
            return (
              <label key={name} className="flex flex-col gap-0.75">
                <span className="text-xxs text-text-grey-dark">{label}</span>
                <CalendarInput
                  variant="single"
                  value={dateValue ? parseToDate(dateValue) : undefined}
                  onChange={value => setValue('date', formatDate(value), { shouldDirty: true })}
                />
              </label>
            )
          }

          if (name === 'time') {
            return (
              <label key={name} className="flex flex-col gap-0.75">
                <span className="text-xxs text-text-grey-dark">{label}</span>
                <TimeRangeInput
                  value={timeValue}
                  onChange={value => setValue('time', value ?? { from: '', to: '' }, { shouldDirty: true })}
                />
              </label>
            )
          }

          return (
            <label key={name} className="flex flex-col gap-0.75">
              <span className="text-xxs text-text-grey-dark">{label}</span>
              <Input type={type} placeholder="Введите текст..." {...register(name)} className="w-full" />
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
          <Button type="submit" label="Сохранить" size="default" className="w-49" />
        </div>
      </form>
    </Modal>
  )
}
