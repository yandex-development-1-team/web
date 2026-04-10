import { forwardRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { AddIcon } from '@/assets/icons'

export interface ProjectFormValues {
  title: string
  isActive: boolean
  description: string
  image: File | string | null
}

const DEFAULT_FORM_VALUES: ProjectFormValues = {
  title: '',
  isActive: true,
  description: '',
  image: null
}

interface Props {
  initialData?: Partial<ProjectFormValues>
  onSubmit: (data: ProjectFormValues) => void
  viewOnly?: boolean
}

export const ProjectForm = forwardRef<HTMLFormElement, Props>(({ initialData, onSubmit, viewOnly = false }, ref) => {
  const [preview, setPreview] = useState<string | null>(
    typeof initialData?.image === 'string' ? initialData.image : null
  )

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    defaultValues: { ...DEFAULT_FORM_VALUES, ...initialData }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue('image', file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex items-end gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xxs text-grey-dark font-normal">Заголовок</label>
          <Input
            placeholder="Название спецпроекта"
            invalid={!!errors.title}
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex items-center gap-3 h-11 mb-0.5">
          <span className="text-small font-normal text-grey-dark">Активен</span>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => <Switch checked={field.value} onChange={!viewOnly ? field.onChange : () => {}} />}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xxs text-grey-dark font-normal">Описание</label>
        <Input
          placeholder="Краткое описание проекта"
          invalid={!!errors.description}
          {...register('description', { required: 'Введите описание' })}
        />
      </div>

      <div>
        <label
          htmlFor="project-image-upload"
          className="
            relative w-full h-[94px] rounded-xl border border-grey-blue-light
            bg-grey-extra-light flex flex-col items-center justify-center
            gap-2 cursor-pointer overflow-hidden hover:bg-grey-light
            transition-colors
          "
        >
          {preview && (
            <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-contain opacity-40" />
          )}

          <div className="relative z-10 flex flex-col items-center gap-3">
            <span className="text-xs text-black font-normal leading-none">Загрузить изображение</span>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
              <AddIcon className="size-8 text-black" />
            </div>
          </div>
        </label>

        {!viewOnly && (
          <input
            id="project-image-upload" // 4. Тот самый ID для связи с label
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        )}
      </div>
    </form>
  )
})

ProjectForm.displayName = 'ProjectForm'
