import { useForm } from 'react-hook-form'
import { Button, Textarea } from '@/components/ui'
import type { InfoFormData, InfoFormType } from './Form.types'

export const InfoForm = ({ defaultValue = '', onSaveInfo, onDeleteInfo }: InfoFormType) => {
  const { register, handleSubmit, reset } = useForm<InfoFormData>({
    defaultValues: { info: defaultValue }
  })

  const handleDelete = () => {
    onDeleteInfo()
    reset({ info: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSaveInfo)} className="flex flex-col gap-[20px]">
      <label className="flex flex-col gap-[3px]">
        <span className="text-xxs text-text-grey-dark">Текст</span>
        <Textarea
          placeholder="Введите текст..."
          {...register('info')}
          className="max-h-[244px]"
          style={{
            resize: 'none',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            overflowY: 'auto'
          }}
        />
      </label>
      <div className="flex gap-[12px] self-end">
        <Button
          type="button"
          onClick={handleDelete}
          label="Удалить"
          variant="secondary"
          size="default"
          className="w-[196px]"
        />
        <Button type="submit" label="Сохранить" size="default" className="w-[196px]" />
      </div>
    </form>
  )
}
