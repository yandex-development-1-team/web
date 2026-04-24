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
        className="flex gap-5"
      >
        <div className="flex flex-col gap-5 grow">
          <label className="flex flex-col gap-0.75">
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
            <span className="text-xxs text-text-error min-h-4">{errors.title?.message || '\u00A0'}</span>
          </label>
          <label className="flex flex-col gap-0.75">
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
            <span className="text-xxs text-text-error min-h-4">{errors.url?.message || '\u00A0'}</span>
          </label>
        </div>
        <Button type="submit" label="Загрузить" size="default" className="self-end w-49 mb-4.75" />
      </form>

      {links.length > 0 && (
        <div className="flex gap-5 flex-wrap">
          {links.map(link => (
            <div key={link.id} className="flex gap-5.25 pl-3 pt-2.5 pb-2">
              <Link
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-text text-text pb-0.5 border-b 
                  border-yellow-accent-light 
                  hover:border-yellow-accent-dark
                  active:border-yellow-accent-dark active:border-b-2"
              >
                {link.title}
              </Link>
              <button
                type="button"
                onClick={() => onRemoveLink(link.id)}
                aria-label="Удалить ссылку"
                className="w-6 h-6 cursor-pointer"
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
