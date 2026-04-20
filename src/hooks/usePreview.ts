import { useState } from 'react'
import { useNotification } from '@/app/providers/notification'

export function usePreview() {
  const { showNotification } = useNotification()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [base64, setBase64] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        showNotification({
          message: 'Пожалуйста, выберите изображение в формате JPEG, PNG или WebP',
          status: 'info'
        })
        return
      }

      if (file.size > 20 * 1024 * 1024) {
        showNotification({
          message: 'Размер файла не должен превышать 20 МБ',
          status: 'info'
        })
        return
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl)

      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(newPreviewUrl)

      // Конвертация в base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setBase64(base64String)
      }
      reader.readAsDataURL(file)

      e.target.value = ''
    }
  }

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setBase64(null)
  }

  return {
    handleFileChange,
    previewUrl,
    setPreviewUrl,
    base64,
    setBase64,
    clearPreview
  }
}
