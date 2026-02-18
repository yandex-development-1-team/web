import { Block } from './ui'

const Resources = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="p-[20px] rounded-[8px] bg-system-background flex flex-col gap-[20px]">
        <h2 className="font-display text-h2 text-black">Информация об организации</h2>
      </div>
      <Block title="Полезные ссылки" />
      <Block title="FAQ" />
      <Block title="Афиша Partner Relations" />
    </div>
  )
}

export const Component = Resources
