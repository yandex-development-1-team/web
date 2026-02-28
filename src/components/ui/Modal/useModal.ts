import { useState, useCallback } from 'react'

export function useModal<T>() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState<T | null>(null)

  const open = useCallback((data: T | null = null) => {
    setModalData(data)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setModalData(null)
  }, [])

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  return { isOpen, modalData, open, close, toggle }
}
