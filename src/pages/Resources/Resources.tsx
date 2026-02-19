import { Button, Textarea } from '@/components/ui'
import { Block } from './ui'

const Resources = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="p-[20px] rounded-[8px] bg-system-background flex flex-col gap-[20px]">
        <h2 className="font-display text-h2 text-black leading-[1.4]">Информация об организации</h2>
        <label className="flex flex-col gap-[3px]">
          <span className="font-display text-xxs text-text-grey-dark">Текст</span>
          <Textarea placeholder="Введите текст..." />
        </label>
        <div className="flex gap-[12px] self-end">
          <Button label="Удалить" variant="secondary" size="default" className="w-[196px]" />
          <Button label="Сохранить" size="default" className="w-[196px]" />
        </div>
      </div>
      <Block title="Полезные ссылки" />
      <Block title="FAQ" />
      <Block title="Афиша Partner Relations" />
    </div>
  )
}

export const Component = Resources
