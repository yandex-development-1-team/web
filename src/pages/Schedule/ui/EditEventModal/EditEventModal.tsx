import { useForm } from 'react-hook-form'
import { Button, CalendarInput, Input, Modal } from '@/components/ui'
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
  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: defaultValue
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
                  value={parseToDate(defaultValue.date)}
                  onChange={value => reset({ ...defaultValue, date: formatDate(value) })}
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
