import { useState } from 'react'
import { Button, Modal, DeleteModal, Select } from '@/components/ui'
import type { BoxApplicationModalProps } from './BoxApplicationModal.types'
import type { TApplicationStatus } from "@/types/applications"

export const BoxApplicationModal = ({ isOpen, onClose, onDelete, onEdit, data }: BoxApplicationModalProps) => {
  const [boxApplicationToDelete, setBoxApplicationToDelete] = useState<string | number | null>(null)
  const [status, setStatus] = useState<TApplicationStatus>(data.processing.status)

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onEdit(data.id, status)
    onClose()
  }

  const handleDelete = () => {
    setBoxApplicationToDelete(data.id)
  }

  const labelClasses = 'text-xxs text-text-grey-dark mb-[6px]'
  const fieldClasses = 'text-h5 mb-[16px]'

  const selectOptions = [
    { value: 'В работе', label: 'В работе' },
    { value: 'В очереди', label: 'В очереди' },
    { value: 'Готово', label: 'Готово' },
  ]

  const handleStatusChange = (newStatus: TApplicationStatus) => {
    setStatus(newStatus)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Заявка"
      footer={
        <div className="flex justify-between w-full">
          <Button
            className='w-[132px]'
            type="button"
            label="Удалить"
            variant="secondaryDanger"
            onClick={handleDelete}
            size="normal"
          />
          <Button
            className='w-[127px] ml-auto mr-[12px]'
            type="button"
            label="Отмена"
            variant="secondary"
            onClick={onClose}
            size="normal"
          />
          <Button
            className='w-[152px]'
            type="submit"
            label="Сохранить"
            size="normal"
            form="boxApplication"
          />
        </div>
      }
      showBorders={true}
    >
      <form id="boxApplication" className='text-text w-full' onSubmit={handleSubmit}>
        <h4 className="text-h4sb my-[-3px_14px]">Клиент</h4>
        <div className='grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light'>
          <div>
            <p className={labelClasses}>Имя</p>
            <p className={fieldClasses}>{data.client?.name}</p>
            <p className={labelClasses}>Организация</p>
            <p className={fieldClasses}>{data.client?.organization}</p>
          </div>
          <div>
            <p className={labelClasses}>Tg-аккаунт</p>
            <p className={fieldClasses}>{data.client?.telegram}</p>
            <p className={labelClasses}>Должность</p>
            <p className={fieldClasses}>{data.client?.position}</p>
          </div>
        </div>

        <h4 className="text-h4sb my-[19px_14px]">Детали бронирования</h4>
        <div className='grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light'>
          <div>
            <p className={labelClasses}>Дата бронирования</p>
            <p className={fieldClasses}>{data.reservation?.date}</p>
          </div>
          <div>
            <p className={labelClasses}>Время</p>
            <p className={fieldClasses}>{data.reservation?.time}</p>
          </div>
        </div>

        <h4 className="text-h4sb my-[19px_14px]">Обработка заявки</h4>
        <div className='grid grid-cols-2 gap-[20px]'>
          <div>
            <p className={`${labelClasses} !mb-[10px]`}>Менеджер</p>
            <div className='flex mb-[16px] items-center'>
              <img
                className='rounded-full size-[32px] object-cover'
                src={data.processing.manager?.photo}
              />
              <p className='text-h5 ml-[5px]'>{data.processing.manager?.name}</p>
            </div>
            <p className={labelClasses}>Название коробки</p>
            <p className={`${fieldClasses} !mb-[2px]`}>{data.processing.boxName}</p>
          </div>
          <div>
            <p className={`${labelClasses} !mb-[2px]`}>Статус</p>
            <Select
              classNames={{trigger: 'w-full'}}
              options={selectOptions}
              value={status}
              placeholder="Статус" 
              onValueChange={handleStatusChange}
            />
            <p className={`${labelClasses} mt-[12px]`}>Дата заявки</p>
            <p className={`${fieldClasses} !mb-[2px]`}>{data.processing.applicationDate}</p>
          </div>
        </div>

      </form>

      <DeleteModal
        title="Удалить заявку?"
        isOpen={!!boxApplicationToDelete || boxApplicationToDelete === 0}
        onDelete={async id => {
          onDelete(id)
        }}
        onClose={() => setBoxApplicationToDelete(null)}
        itemId={boxApplicationToDelete}
      >
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>

    </Modal>
  )
}
