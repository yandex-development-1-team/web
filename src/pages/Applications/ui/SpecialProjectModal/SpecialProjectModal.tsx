import { Button, DeleteModal, Modal, Select } from '@/components/ui'
import type { TApplicationStatus } from '@/types/applications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getApplicationById } from '../../api/applications/getApplicationById'
import type { SpecialProjectApplicationModalProps } from './SpecialProjectModal.types'

export const SpecialProjectModal = ({
  isOpen,
  onClose,
  onDelete,
  onModify,
  data,
  queryKey,
  id
}: SpecialProjectApplicationModalProps) => {
  const [applicationToDelete, setApplicationToDelete] = useState<string | number | null>(null)
  // const [status, setStatus] = useState<TApplicationStatus>(data?.processing?.status)

  const { data: application } = useQuery({
    queryKey: ['applicationById', id],
    queryFn: () => getApplicationById(id),
    enabled: !!id
  })

  const handleCancel = () => {
    // setStatus(data.processing.status)
    onClose()
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    void onModify //TODO: remove
    void data //TODO: remove
    //onModify(data.id, status)
    onClose()
  }

  const handleDelete = () => {
    // setApplicationToDelete(data.id)
  }

  const labelClasses = 'text-xxs text-text-grey-dark mb-[6px]'
  const fieldClasses = 'text-h5 mb-[16px]'

  const selectOptions = [
    { value: 'В работе', label: 'В работе' },
    { value: 'В очереди', label: 'В очереди' },
    { value: 'Готово', label: 'Готово' }
  ]

  const handleStatusChange = (newStatus: TApplicationStatus) => {
    void newStatus //TODO: remove
    // setStatus(newStatus)
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
              <p className={fieldClasses}>{application?.client?.name}</p>
            </div>
            <div>
              <p className={labelClasses}>Тг-аккаунт</p>
              <p className={fieldClasses}>{application?.client?.telegram}</p>
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Обработка заявки</h4>
          <div className="grid grid-cols-2 gap-[20px] pb-[7px] border-b-1 border-grey-blue-light">
            <div>
              <p className={`${labelClasses} !mb-[10px]`}>Менеджер</p>
              <div className="flex mb-[16px] items-center">
                <img className="rounded-full size-[32px] object-cover" src={application?.processing.manager?.photo} />
                <p className="text-h5 ml-[5px]">{application?.processing.manager?.name}</p>
              </div>
              <p className={labelClasses}>Дата заявки</p>
              <p className={`${fieldClasses} !mb-[2px]`}>{application?.processing.applicationDate}</p>
            </div>
            <div>
              <p className={`${labelClasses} !mb-[2px]`}>Статус</p>
              <Select
                classNames={{ trigger: 'w-full' }}
                options={selectOptions}
                value={status}
                placeholder="Статус"
                onValueChange={handleStatusChange}
              />
            </div>
          </div>

          <h4 className="text-h4sb my-[19px_14px]">Текст заявки</h4>
          <div className="pb-[7px]">
            <div className="space-y-[10px] overflow-y-auto">
              {application?.request.questions.map((question, index) => (
                <div key={`${question.label}-${index}`}>
                  <p className={labelClasses}>{question.label}</p>
                  <p className={`${fieldClasses} !mb-[6px]`}>{question.answer}</p>
                </div>
              ))}
              <div>
                <p className={labelClasses}>{application?.request.textLabel ?? 'Текст'}</p>
                <div className="max-h-[170px] pr-[8px]">
                  <p className="text-h5 text-text leading-[140%]">{application?.request.text}</p>
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
        onClose={() => setApplicationToDelete(null)}
        itemId={applicationToDelete}
        queryKey={queryKey}
      >
        <p>Вы действительно хотите удалить эту заявку?</p>
        <p>Действие нельзя отменить</p>
      </DeleteModal>
    </>
  )
}
