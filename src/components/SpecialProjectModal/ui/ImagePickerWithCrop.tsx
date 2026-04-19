import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils.clsx'
import { AddIcon } from '@/assets/icons'
import { Button, ImageCropper, Input } from '@/components/ui'
import { usePreview } from '@/hooks/usePreview'

interface ImagePickerWithCropProps {
  name?: string
  getIsCropping?: (val: boolean) => void
  previewImg?: string
}

export function ImagePickerWithCrop({ name, getIsCropping, previewImg }: ImagePickerWithCropProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { handleFileChange, previewUrl, clearPreview, base64 } = usePreview()
  const [cropImage, setCropImage] = useState<string | null>(() => {
    return previewImg ? previewImg : null
  })
  const [isCropping, setIsCropping] = useState(false)

  const { setValue, register, clearErrors } = useFormContext()

  const handleCropImg = (e: ChangeEvent<HTMLInputElement, Element>) => {
    handleFileChange(e)

    setIsCropping(() => true)
    getIsCropping?.(isCropping)
  }

  const handleCancelCrop = () => {
    clearPreview()
    clearErrors('root.croppingInProgress')
    setIsCropping(false)
  }

  useEffect(() => {
    if (isCropping) {
      getIsCropping?.(true)
    } else {
      getIsCropping?.(false)
    }
  }, [getIsCropping, isCropping])

  return (
    <div
      className={cn(
        'bg-grey-extra-light border-grey-light min-h-23.5 rounded-lg border p-2 flex gap-3 items-center justify-center',
        {
          ['flex-col justify-between bg-white border-transparent']: isCropping || cropImage
        }
      )}
    >
      <>
        {previewUrl && isCropping ? (
          <ImageCropper
            image={previewUrl || ''}
            containerHeight={172}
            containerWidth={262}
            aspect={262 / 172}
            onCancel={handleCancelCrop}
            onComplete={file => {
              const dataTransfer = new DataTransfer()
              dataTransfer.items.add(file)
              const finalImg = URL.createObjectURL(file)

              setValue('image', base64, { shouldDirty: true, shouldValidate: true })

              setIsCropping(false)
              clearPreview()
              setCropImage(finalImg)
              clearErrors('root.croppingInProgress')
            }}
          />
        ) : (
          cropImage && (
            <img
              src={cropImage || ''}
              alt="preview"
              className="w-[262px] h-[172px] object-cover border-grey-light border rounded-lg"
            />
          )
        )}
      </>
      <div className={cn('flex items-center gap-3')}>
        <Button size="icon-48" type="button" className="relative" onClick={() => inputRef.current?.click()}>
          <AddIcon className="size-full" />
          <div className="absolute">
            <Input
              {...register(`${name}`)}
              type="file"
              hidden
              accept="image/jpeg, image/png, image/webp"
              ref={inputRef}
              onChange={handleCropImg}
            />
          </div>
        </Button>
        <div className={cn('text-small')}>{!cropImage ? 'Загрузить изображение' : 'Загрузить другое изображение'}</div>
      </div>
    </div>
  )
}
