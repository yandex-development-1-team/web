import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Button, Input } from '@/components/ui'
import { CloseIcon } from '@/assets/icons'
import type { BlockType, FormFields } from './Block.types'

export const Block = ({ title }: BlockType) => {
  const { register, handleSubmit } = useForm<FormFields>()

  const [linksData, setLinksData] = useState<FormFields[]>([])

  const onSubmit: SubmitHandler<FormFields> = async data => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLinksData([...linksData, data])
    console.log(data)
  }

  return (
    <div className="p-[20px] rounded-[8px] bg-system-background flex flex-col gap-[20px]">
      <h2 className="font-display text-h2 text-black leading-[1.4]">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-[20px]">
        <div className="flex flex-col gap-[20px] grow">
          <label className="flex flex-col gap-[3px]">
            <span className="font-display text-xxs text-text-grey-dark">Название</span>
            <Input type="text" variant="text" placeholder="Введите название" {...register('title')} />
          </label>
          <label className="flex flex-col gap-[3px]">
            <span className="font-display text-xxs text-text-grey-dark">URL</span>
            <Input type="url" variant="text" placeholder="Вставьте ссылку" {...register('url')} />
          </label>
        </div>
        <Button type="submit" label="Загрузить" size="default" className="self-end w-[196px]" />
      </form>

      {linksData.length > 0 && (
        <div className="flex gap-[20px] flex-wrap">
          {linksData.map((link, index) => (
            <div key={index} className="flex gap-[21px] pl-[12px] pt-[10px] pb-[8px]">
              <Link
                to={link.url}
                target="_blank"
                className="font-display text-button text-text pb-[2px] border-b 
                  border-yellow-accent-light 
                  hover:border-yellow-accent-dark
                  active:border-yellow-accent-dark active:border-b-[2px]"
              >
                {link.title}
              </Link>
              <button type="button" className="w-[24px] h-[24px] cursor-pointer">
                <CloseIcon className="w-full h-full text-text" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
