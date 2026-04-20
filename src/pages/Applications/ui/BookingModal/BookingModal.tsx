import { Button, DeleteModal, Modal, Select } from '@/components/ui'
import type { TApplicationStatus } from '@/types/applications'
import { useState } from 'react'
import { useBookings } from '../../hooks/useBookings'
import type { BoxApplicationModalProps } from './BookingModal.types'

type TSelect = {
  options: {
    value: string
    label: string
  }[]
  placeholder: string
  classNames?: {
    trigger?: string
    value?: string
    content?: string
    item?: string
  }
}

const selectOptions: TSelect = {
  options: [
    { value: 'confirmed', label: 'В работе' },
    { value: 'pending', label: 'В очереди' },
    { value: 'cancelled', label: 'Завершено' }
  ],
  placeholder: ''
}

export const BookingModal = ({ isOpen, onClose, onDelete, onModify, data, queryKey, id }: BoxApplicationModalProps) => {
  const { booking, updateStatus } = useBookings(id, onModify, queryKey)
  const [boxApplicationToDelete, setBoxApplicationToDelete] = useState<string | number | null>(null)
  const [status, setStatus] = useState<TApplicationStatus | undefined>(booking?.processing.status)

  const handleCancel = () => {
    // setStatus(data.processing.status)
    void data //TODO: remove
    onClose()
  }
  console.log(booking?.processing.status)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('handleSubmit', { status })
    if (status) {
      updateStatus({ id: id, newStatus: status })
      onClose()
    }
  }

  const handleDelete = () => {
    setBoxApplicationToDelete(id)
  }

  const labelClasses = 'text-xxs text-text-grey-dark mb-[6px]'
  const fieldClasses = 'text-h5 mb-[16px]'

  const handleStatusChange = (newStatus: TApplicationStatus) => {
    // console.log('status changed', { newStatus })

    setStatus(newStatus)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
        title="Заявка"
        footer={
          <div className="flex justify-between w-full">
            <Button
              className="w-[132px]"
              type="button"
              label="Удалить"
              variant="secondaryDanger"
              onClick={handleDelete}
              size="normal"
            />
            <Button
              className="w-[127px] ml-auto mr-[12px]"
              type="button"
              label="Отмена"
              variant="secondary"
              onClick={handleCancel}
              size="normal"
            />
            <Button className="w-[152px]" type="submit" label="Сохранить" size="normal" form="boxApplication" />
          </div>
        }
        showBorders={true}
      >
        <form id="boxApplication" className="text-text w-full" onSubmit={handleSubmit}>
          <h4 className="text-h4sb my-[-3px_14px]">Клиент</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={labelClasses}>Имя</p>
              <p className={fieldClasses}>{booking?.client?.name}</p>
              <p className={labelClasses}>Организация</p>
              <p className={fieldClasses}>{booking?.client?.organization}</p>
            </div>
            <div>
              <p className={labelClasses}>Tg-аккаунт</p>
              <p className={fieldClasses}>{booking?.client?.telegram}</p>
              <p className={labelClasses}>Должность</p>
              <p className={fieldClasses}>{booking?.client?.position}</p>
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Детали бронирования</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={labelClasses}>Дата бронирования</p>
              <p className={fieldClasses}>{booking?.reservation?.date}</p>
            </div>
            <div>
              <p className={labelClasses}>Время</p>
              <p className={fieldClasses}>{booking?.reservation?.time}</p>
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Обработка заявки</h4>
          <div className="grid grid-cols-2 gap-[20px]">
            <div>
              <p className={`${labelClasses} !mb-[10px]`}>Менеджер</p>
              <div className="flex mb-[16px] items-center">
                <img className="rounded-full size-[32px] object-cover" src={booking?.processing.manager?.photo} />
                <p className="text-h5 ml-[5px]">{booking?.processing.manager?.name}</p>
              </div>
              <p className={labelClasses}>Название коробки</p>
              <p className={`${fieldClasses} !mb-[2px]`}>{booking?.processing.boxName}</p>
            </div>
            <div>
              <p className={`${labelClasses} !mb-[2px]`}>Статус</p>
              <Select
                key={booking?.processing.status}
                classNames={{ trigger: 'w-full' }}
                options={selectOptions.options}
                defaultValue={booking?.processing.status}
                placeholder={selectOptions.placeholder}
                onValueChange={handleStatusChange}
              />
              <p className={`${labelClasses} mt-[12px]`}>Дата заявки</p>
              <p className={`${fieldClasses} !mb-[2px]`}>{booking?.processing.applicationDate}</p>
            </div>
          </div>
        </form>
      </Modal>

      <DeleteModal
        title="Удалить заявку?"
        isOpen={!!boxApplicationToDelete || boxApplicationToDelete === 0}
        onDelete={id => onDelete(id)}
        onClose={() => {
          // setBoxApplicationToDelete(null)
          onClose()
        }}
        itemId={boxApplicationToDelete}
        queryKey={queryKey}
      >
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </>
  )
}
