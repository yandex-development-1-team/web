import { useState, useCallback } from 'react'

// Объявляем функцию с дженериком <T>, чтобы хук мог работать с любым типом данных (id, объекты и т.д.)
export function useModal<T>() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState<T | null>(null)

  // Функция открытия
  const open = useCallback((data: T | null = null) => {
    setModalData(data)
    setIsOpen(true)
  }, [])

  // Функция закрытия
  const close = useCallback(() => {
    setIsOpen(false)
    setModalData(null)
  }, [])

  // Функция-переключатель
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  return { isOpen, modalData, open, close, toggle }
}
