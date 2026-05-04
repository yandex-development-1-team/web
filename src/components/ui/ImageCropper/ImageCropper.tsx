import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { CheckIcon, CloseIcon } from '@/assets/icons'
import { Button } from '../Button'

type ImageCropperType = {
  image: string
  containerWidth: number
  containerHeight: number
  aspect?: number | null | undefined
  onComplete: (file: File) => void
  onCancel: () => void
}

export const ImageCropper = ({
  image,
  aspect = null,
  containerWidth,
  containerHeight,
  onComplete,
  onCancel
}: ImageCropperType) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget

    let initialCrop: Crop

    if (aspect && aspect !== null) {
      initialCrop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90
          },
          aspect,
          width,
          height
        ),
        width,
        height
      )
    } else {
      initialCrop = {
        unit: '%',
        x: 5,
        y: 5,
        width: 90,
        height: 90
      }
    }

    setCrop(initialCrop)
    setCompletedCrop({
      ...initialCrop,
      unit: 'px'
    } as PixelCrop)
  }

  const handleSave = () => {
    const img = imgRef.current
    if (!completedCrop || !img) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const scaleX = img.naturalWidth / img.width
    const scaleY = img.naturalHeight / img.height

    canvas.width = Math.floor(completedCrop.width * scaleX)
    canvas.height = Math.floor(completedCrop.height * scaleY)

    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    )

    canvas.toBlob(
      blob => {
        if (!blob) return
        const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' })
        onComplete(file)
      },
      'image/jpeg',
      0.92
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`w-[${containerWidth}px] h-[${containerHeight}px] 
        border border-grey-light rounded-[8px] flex justify-center`}
      >
        <ReactCrop
          crop={crop}
          onChange={c => setCrop(c)}
          onComplete={c => setCompletedCrop(c)}
          aspect={aspect && aspect !== null ? aspect : undefined}
          className="[&>div]:h-full "
        >
          <img ref={imgRef} src={image} onLoad={onImageLoad} alt="Для обрезки" className="h-full object-contain" />
        </ReactCrop>
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onCancel}
          variant="elevated"
          leftIcon={<CloseIcon className="size-[24px]" />}
          className="self-start p-[8px] text-(length:--text-xs) font-normal"
          label="Отмена"
        />
        <Button
          type="button"
          onClick={handleSave}
          variant="elevated"
          leftIcon={<CheckIcon className="size-[24px]" />}
          className="self-start p-[8px] text-(length:--text-xs) font-normal"
          label="Готово"
        />
      </div>
    </div>
  )
}
