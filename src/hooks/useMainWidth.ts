import { useState, useEffect, useRef } from 'react'

export function useMainWidth(ms: number = 0) {
  const [width, setWidth] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const aside = document.querySelector('aside')

    const calculateWidth = () => {
      const viewportWidth = document.documentElement.clientWidth
      const asideWidth = aside ? aside.offsetWidth : 0
      const newWidth = viewportWidth - asideWidth

      if (ms <= 0) {
        setWidth(newWidth)
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        
        timeoutRef.current = setTimeout(() => {
          setWidth(newWidth)
        }, ms)
      }

      setWidth(viewportWidth - asideWidth)
    }

    const resizeObserver = new ResizeObserver(calculateWidth)

    resizeObserver.observe(document.documentElement)
    if (aside) resizeObserver.observe(aside)

    const initialViewportWidth = document.documentElement.clientWidth
    const initialAsideWidth = aside ? aside.offsetWidth : 0
    setWidth(initialViewportWidth - initialAsideWidth)

    return () => {
      resizeObserver.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

  }, [ms])

  return width
}
