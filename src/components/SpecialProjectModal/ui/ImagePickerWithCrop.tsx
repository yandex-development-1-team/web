import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils.clsx'
import { AddIcon } from '@/assets/icons'
import { Button, Input } from '@/components/ui'
import { ImageCropper } from '@/components/ui/ImageCropper/ImageCropper'
import { usePreview } from '@/hooks/usePreview'

interface ImagePickerWithCropProps {
  name?: string
  getIsCropping?: (val: boolean) => void
  previewImg?: string
}

export function ImagePickerWithCrop({ name, getIsCropping, previewImg }: ImagePickerWithCropProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { handleFileChange, previewUrl, clearPreview } = usePreview()
  const [cropImage, setCropImage] = useState<string | null>(() => {
    return previewImg ? previewImg : null
  })
  const [isCropping, setIsCropping] = useState(false)

  const { setValue, register, clearErrors } = useFormContext()

  const handleCropImg = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e)
    setIsCropping(true)
    getIsCropping?.(true)
    e.target.value = ''
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
            onComplete={async file => {
              const finalImgUrl = URL.createObjectURL(file)

              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onloadend = () => {
                const croppedBase64 = reader.result as string

                setValue('image', croppedBase64, {
                  shouldDirty: true,
                  shouldValidate: true
                })

                setCropImage(finalImgUrl)
                setIsCropping(false)
                clearPreview()
                clearErrors('root.croppingInProgress')
              }
            }}
          />
        ) : (
          cropImage && (
            <img
              src={cropImage || ''}
              alt="preview"
              className="w-[262px] h-[172px] object-contain rounded-lg"
            />
          )
        )}
      </>
      <div className={`flex items-center ${!cropImage ? 'flex-col gap-2' : 'gap-3'}`}>
        <Button
          size="icon-48"
          type="button"
          className={`relative ${!cropImage ? 'order-2' : 'order-1'}`}
          onClick={() => inputRef.current?.click()}
          disabled={isCropping}
        >
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
        <div className={`text-small ${!cropImage ? 'order-1' : 'order-2'}`}>
          {!cropImage ? 'Загрузить изображение' : 'Загрузить другое изображение'}
        </div>
      </div>
    </div>
  )
}
