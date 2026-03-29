import { Button } from '@/components/ui'
import React, { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type Props = {
  image: string
  aspect?: number
  onComplete: (file: File) => void
  onCancel: () => void
}

export const ImageCropper = ({ image, aspect = 296 / 141, onComplete, onCancel }: Props) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget

      const initialCrop = centerCrop(
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

      setCrop(initialCrop)
      setCompletedCrop({
        ...initialCrop,
        unit: 'px'
      } as PixelCrop)
    },
    [aspect]
  )

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
      <ReactCrop
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={c => setCompletedCrop(c)}
        aspect={aspect}
        ruleOfThirds={true}
      >
        <img
          ref={imgRef}
          id="crop-image"
          src={image}
          onLoad={onImageLoad}
          alt="Для обрезки"
          style={{ maxWidth: '100%', maxHeight: '70vh' }}
        />
      </ReactCrop>

      <div className="flex justify-between">
        <Button type="button" variant="underline" onClick={onCancel} className="text-text no-underline">
          Отмена
        </Button>
        <Button type="button" variant="underline" onClick={handleSave} className="text-text no-underline">
          Готово
        </Button>
      </div>
    </div>
  )
}
