import { useState, useEffect } from 'react'

export function useMainWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const aside = document.querySelector('aside')

    const calculateWidth = () => {
      const viewportWidth = document.documentElement.clientWidth
      const asideWidth = aside ? aside.offsetWidth : 0
      setWidth(viewportWidth - asideWidth)
    }

    const resizeObserver = new ResizeObserver(calculateWidth)

    resizeObserver.observe(document.documentElement)
    if (aside) resizeObserver.observe(aside)

    calculateWidth()

    return () => resizeObserver.disconnect()
  }, [])

  return width
}
