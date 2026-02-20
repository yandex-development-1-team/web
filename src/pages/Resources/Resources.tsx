import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Textarea } from '@/components/ui'
import { Block } from './ui'
import type { ResourcesData } from './Resources.types'
import type { FormFields } from './ui/Block.types'

const Resources = () => {
  const [data, setData] = useState<ResourcesData>({
    organizationInfo: '',
    usefulLinks: [],
    faq: [],
    eventSchedule: []
  })

  const {
    register: registerTextarea,
    handleSubmit: handleTextareaSubmit,
    reset: resetTextarea
  } = useForm<{ info: string }>()

  const handleSaveInfo = handleTextareaSubmit(textareaData => {
    setData(prev => ({ ...prev, organizationInfo: textareaData.info }))
  })

  const handleDeleteInfo = () => {
    setData(prev => ({ ...prev, organizationInfo: '' }))
    resetTextarea({ info: '' })
  }

  const addLink =
    (blockKey: keyof Pick<ResourcesData, 'usefulLinks' | 'faq' | 'eventSchedule'>) => (linkData: FormFields) => {
      setData(prev => ({ ...prev, [blockKey]: [...prev[blockKey], linkData] }))
    }

  const removeLink =
    (blockKey: keyof Pick<ResourcesData, 'usefulLinks' | 'faq' | 'eventSchedule'>) => (index: number) => {
      setData(prev => ({ ...prev, [blockKey]: prev[blockKey].filter((_, i) => i !== index) }))
    }

  return (
    <div className="flex flex-col gap-[20px]">
      <form onSubmit={handleSaveInfo} className="p-[20px] rounded-[8px] bg-system-background flex flex-col gap-[20px]">
        <h2 className="font-display text-h2 text-black leading-[1.4]">Информация об организации</h2>
        <label className="flex flex-col gap-[3px]">
          <span className="font-display text-xxs text-text-grey-dark">Текст</span>
          <Textarea
            placeholder="Введите текст..."
            defaultValue={data.organizationInfo}
            {...registerTextarea('info')}
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
            onClick={handleDeleteInfo}
            label="Удалить"
            variant="secondary"
            size="default"
            className="w-[196px]"
          />
          <Button type="submit" label="Сохранить" size="default" className="w-[196px]" />
        </div>
      </form>
      <Block
        title="Полезные ссылки"
        links={data.usefulLinks}
        onAddLink={addLink('usefulLinks')}
        onRemoveLink={removeLink('usefulLinks')}
      />
      <Block title="FAQ" links={data.faq} onAddLink={addLink('faq')} onRemoveLink={removeLink('faq')} />
      <Block
        title="Афиша Partner Relations"
        links={data.eventSchedule}
        onAddLink={addLink('eventSchedule')}
        onRemoveLink={removeLink('eventSchedule')}
      />
    </div>
  )
}

export const Component = Resources
