import { UserIcon } from '@/assets/icons'
import { Button, DeleteModal, Modal, Select } from '@/components/ui'
import { formatDateToLocalUI } from '@/lib/utils.date'
import type { TApplicationStatus } from '@/types/applications'
import { useState } from 'react'
import type { ModalPropsType } from '../../applications.types'
import { useStatus } from '../../hooks/useStatus'
import type { SelectType } from '../types'
import { UserIcon } from '@/assets/icons'
import { formatDateToLocalUI } from '@/lib/utils.date'

const boxSelectOptions: SelectType = {
  options: [
    { value: 'confirmed', label: 'В работе' },
    { value: 'pending', label: 'В очереди' },
    { value: 'cancelled', label: 'Завершено' }
  ],
  placeholder: ''
}

export const BoxModal = ({ id, isOpen, onClose, onDelete, onModify, queryKey, activeTab }: ModalPropsType) => {
  const { box, updateStatus, isStatusUpdating } = useStatus(id, activeTab, onModify, queryKey)
  const [boxApplicationToDelete, setBoxApplicationToDelete] = useState<string | number | null>(null)
  const [status, setStatus] = useState<TApplicationStatus | undefined>(box?.processing.status)

  const handleCancel = () => {
    onClose()
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (status) {
      updateStatus({ id: id, newStatus: status })
      onClose()
    }
  }

  const handleDelete = () => {
    setBoxApplicationToDelete(id)
  }

  const handleStatusChange = (newStatus: TApplicationStatus) => {
    setStatus(newStatus)
  }

  const labelClasses = 'text-xxs text-text-grey-dark mb-[6px]'
  const fieldClasses = 'text-h5 mb-[16px]'

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
            <Button
              className="w-[152px]"
              type="submit"
              label={isStatusUpdating ? 'Сохранение...' : 'Сохранить'}
              size="normal"
              form="boxApplication"
            />
          </div>
        }
        showBorders={true}
      >
        <form id="boxApplication" className="text-text w-full" onSubmit={handleSubmit}>
          <h4 className="text-h4sb my-[-3px_14px]">Клиент</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={labelClasses}>Имя</p>
              <p className={fieldClasses}>{box?.client?.name}</p>
              <p className={labelClasses}>Организация</p>
              <p className={fieldClasses}>{box?.client?.organization}</p>
            </div>
            <div>
              <p className={labelClasses}>Tg-аккаунт</p>
              <p className={fieldClasses}>{box?.client?.telegram}</p>
              <p className={labelClasses}>Должность</p>
              <p className={fieldClasses}>{box?.client?.position}</p>
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Детали бронирования</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={labelClasses}>Дата бронирования</p>
              <p className={fieldClasses}>{formatDateToLocalUI(box?.reservation?.date)}</p>
            </div>
            <div>
              <p className={labelClasses}>Время</p>
              <p className={fieldClasses}>{box?.reservation?.time}</p>
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Обработка заявки</h4>
          <div className="grid grid-cols-2 gap-[20px]">
            <div>
              <p className={`${labelClasses} !mb-[10px]`}>Менеджер</p>
              <div className="flex mb-[16px] items-center">
                {(box?.processing.manager?.photo && (
                  <img className="rounded-full size-[32px] object-cover" src={box?.processing.manager?.photo} />
                )) || <UserIcon className="text-text-grey-light size-[32px]" />}
                <p className="text-h5 ml-[5px]">{box?.processing.manager?.name}</p>
              </div>
              <p className={labelClasses}>Название коробки</p>
              <p className={`${fieldClasses} !mb-[2px]`}>{box?.processing.boxName}</p>
            </div>
            <div>
              <p className={`${labelClasses} !mb-[2px]`}>Статус</p>
              <Select
                key={box?.processing.status}
                classNames={{ trigger: 'w-full' }}
                options={boxSelectOptions.options}
                defaultValue={box?.processing.status}
                placeholder={boxSelectOptions.placeholder}
                onValueChange={handleStatusChange}
              />
              <p className={`${labelClasses} mt-[12px]`}>Дата заявки</p>
              <p className={`${fieldClasses} !mb-[2px]`}>{formatDateToLocalUI(box?.processing.applicationDate)}</p>
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
