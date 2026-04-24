import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Textarea } from '@/components/ui'
import type { InfoFormData, InfoFormType } from './Form.types'

export const InfoForm = ({ defaultValue = '', onSaveInfo, onDeleteInfo }: InfoFormType) => {
  const { register, handleSubmit, reset } = useForm<InfoFormData>({
    defaultValues: { info: defaultValue }
  })

  useEffect(() => {
    reset({ info: defaultValue })
  }, [defaultValue, reset])

  const handleDelete = () => {
    onDeleteInfo()
    reset({ info: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSaveInfo)} className="flex flex-col gap-5">
      <label className="flex flex-col gap-0.75">
        <span className="text-xxs text-text-grey-dark">Текст</span>
        <Textarea
          placeholder="Введите текст..."
          {...register('info')}
          className="max-h-61"
          style={{
            resize: 'none',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            overflowY: 'auto'
          }}
        />
      </label>
      <div className="flex gap-3 self-end">
        <Button
          type="button"
          onClick={handleDelete}
          label="Удалить"
          variant="secondary"
          size="default"
          className="w-49"
        />
        <Button type="submit" label="Сохранить" size="default" className="w-49" />
      </div>
    </form>
  )
}
