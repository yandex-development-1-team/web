import { Button, DeleteModal, Modal, Select } from '@/components/ui'
import type { TApplicationStatus } from '@/types/applications'
import { useState } from 'react'
import type { ModalPropsType } from '../../applications.types'
import { useStatus } from '../../hooks/useBoxes'
import type { SelectType } from '../types'
import { UserIcon } from '@/assets/icons'

const specialProjectSelectOptions: SelectType = {
  options: [
    { value: 'confirmed', label: 'В работе' },
    { value: 'pending', label: 'В очереди' },
    { value: 'cancelled', label: 'Завершено' }
  ],
  placeholder: ''
}

export const SpecialProjectModal = ({
  id,
  isOpen,
  onClose,
  onDelete,
  onModify,
  queryKey,
  activeTab
}: ModalPropsType) => {
  const { specialProject, updateStatus } = useStatus(id, activeTab, onModify, queryKey)
  const [applicationToDelete, setApplicationToDelete] = useState<string | number | null>(null)
  const [status, setStatus] = useState<TApplicationStatus | undefined>(specialProject?.processing.status)

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
    setApplicationToDelete(id)
  }

  const labelClasses = 'text-xxs text-text-grey-dark mb-[6px]'
  const fieldClasses = 'text-h5 mb-[16px]'

  const handleStatusChange = (newStatus: TApplicationStatus) => {
    setStatus(newStatus)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
        title="Заявка на спецпроект"
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
            <Button className="w-[152px]" type="submit" label="Сохранить" size="normal" form="specialProjectApp" />
          </div>
        }
        showBorders={true}
      >
        <form id="specialProjectApp" className="text-text w-full" onSubmit={handleSubmit}>
          <h4 className="text-h4sb my-[-3px_14px]">Клиент</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={labelClasses}>Имя</p>
              <p className={fieldClasses}>{specialProject?.client?.name}</p>
            </div>
            <div>
              <p className={labelClasses}>Тг-аккаунт</p>
              <p className={fieldClasses}>{specialProject?.client?.telegram}</p>
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Обработка заявки</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={`${labelClasses} !mb-[10px]`}>Менеджер</p>
              <div className="flex mb-[16px] items-center">
                {specialProject?.processing.manager?.photo && (
                    <img
                      className="rounded-full size-[32px] object-cover"
                      src={specialProject?.processing.manager?.photo}
                    />
                  ) || <UserIcon className="text-text-grey-light size-[32px]" />
                }
                <p className="text-h5 ml-[5px]">{specialProject?.processing.manager?.name}</p>
              </div>
              <p className={labelClasses}>Дата заявки</p>
              <p className={`${fieldClasses} !mb-[2px]`}>{specialProject?.processing.applicationDate}</p>
            </div>
            <div>
              <p className={`${labelClasses} !mb-[2px]`}>Статус</p>
              <Select
                key={specialProject?.processing.status}
                classNames={{ trigger: 'w-full' }}
                options={specialProjectSelectOptions.options}
                defaultValue={specialProject?.processing.status}
                placeholder={specialProjectSelectOptions.placeholder}
                onValueChange={handleStatusChange}
              />
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Текст заявки</h4>
          <div className="pb-[7px]">
            <div className="space-y-[10px] overflow-y-auto">
              {specialProject?.request.questions.map((question, index) => (
                <div key={`${question.label}-${index}`}>
                  <p className={labelClasses}>{question.label}</p>
                  <p className={`${fieldClasses} !mb-[6px]`}>{question.answer}</p>
                </div>
              ))}
              <div>
                <p className={labelClasses}>{specialProject?.request.textLabel ?? 'Текст'}</p>
                <div className="max-h-[170px] pr-[8px]">
                  <p className="text-h5 text-text leading-[140%]">{specialProject?.request.text}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <DeleteModal
        title="Удалить заявку?"
        isOpen={!!applicationToDelete || applicationToDelete === 0}
        onDelete={id => onDelete(id)}
        onClose={() => onClose()}
        itemId={applicationToDelete}
        queryKey={queryKey}
      >
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </>
  )
}
