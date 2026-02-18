import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { BlockType, FormFields } from './Block.types'
import { CloseIcon } from '@/assets/icons'

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
      <h2 className="font-display text-h2 text-black">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
        <input
          type="text"
          placeholder="Название"
          className="border-2 border-slate-400 rounded-md text-black placeholder-black-50"
          {...register('title')}
        />

        <input
          type="url"
          placeholder="Ссылка"
          className="border-2 border-slate-400 rounded-md text-black placeholder-black-50"
          {...register('url')}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="flex gap-[20px] flex-wrap">
        {linksData.length > 0 &&
          linksData.map((link, index) => (
            <div key={index} className="flex gap-[21px]">
              <Link
                to={link.url}
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
    </div>
  )
}
