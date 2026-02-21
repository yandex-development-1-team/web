import { Link } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Button, Input } from '@/components/ui'
import { CloseIcon } from '@/assets/icons'
import type { LinkFormFields, LinkFormType } from './Form.types'

export const LinkForm = ({ links, onAddLink, onRemoveLink }: LinkFormType) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors
  } = useForm<LinkFormFields>()

  const onSubmit: SubmitHandler<LinkFormFields> = data => {
    onAddLink(data)
    reset()
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onBlur={e => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            clearErrors()
          }
        }}
        noValidate
        className="flex gap-[20px]"
      >
        <div className="flex flex-col gap-[20px] grow">
          <label className="flex flex-col gap-[3px]">
            <span className="text-xxs text-text-grey-dark">Название</span>
            <Input
              type="text"
              variant="text"
              placeholder="Введите название"
              aria-invalid={!!errors.title}
              {...register('title', {
                required: 'Введите название',
                minLength: {
                  value: 2,
                  message: 'Название должно содержать минимум 2 символа'
                },
                onChange: () => {
                  if (errors.title) {
                    clearErrors('title')
                  }
                }
              })}
            />
            {errors.title && <span className="text-xxs text-text-error">{errors.title.message}</span>}
          </label>
          <label className="flex flex-col gap-[3px]">
            <span className="text-xxs text-text-grey-dark">URL</span>
            <Input
              type="url"
              variant="text"
              placeholder="Вставьте ссылку"
              aria-invalid={!!errors.url}
              {...register('url', {
                required: 'Введите URL',
                pattern: {
                  value: /^https?:\/\/.+\..+/i,
                  message: 'Введите корректный URL (например, https://example.com)'
                },
                onChange: () => {
                  if (errors.url) {
                    clearErrors('url')
                  }
                }
              })}
            />
            {errors.url && <span className="text-xxs text-text-error">{errors.url.message}</span>}
          </label>
        </div>
        <Button type="submit" label="Загрузить" size="default" className="self-end w-[196px]" />
      </form>

      {links.length > 0 && (
        <div className="flex gap-[20px] flex-wrap">
          {links.map((link, index) => (
            <div key={index} className="flex gap-[21px] pl-[12px] pt-[10px] pb-[8px]">
              <Link
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-button text-text pb-[2px] border-b 
                  border-yellow-accent-light 
                  hover:border-yellow-accent-dark
                  active:border-yellow-accent-dark active:border-b-[2px]"
              >
                {link.title}
              </Link>
              <button
                type="button"
                onClick={() => onRemoveLink(index)}
                aria-label="Удалить ссылку"
                className="w-[24px] h-[24px] cursor-pointer"
              >
                <CloseIcon className="w-full h-full text-text" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
