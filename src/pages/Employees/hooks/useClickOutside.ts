import { useEffect, type RefObject } from 'react'

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (e: MouseEvent | TouchEvent | KeyboardEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref?.current

      if (!element || element.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    const keyListener = (event: KeyboardEvent) => event.code === 'Escape' && handler(event)

    window.addEventListener('mousedown', listener)
    window.addEventListener('touchstart', listener)
    window.addEventListener('keydown', keyListener)

    return () => {
      window.removeEventListener('mousedown', listener)
      window.removeEventListener('touchstart', listener)
      window.removeEventListener('keydown', keyListener)
    }
  }, [ref, handler])
}
