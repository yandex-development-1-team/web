import { useState, useEffect } from 'react'

export function useMainWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const aside = document.querySelector('aside')

    const calculateWidth = () => {
      const asideWidth = aside ? aside.offsetWidth : 0
      setWidth(window.innerWidth - asideWidth)
    }

    window.addEventListener('resize', calculateWidth)

    const resizeObserver = new ResizeObserver(() => {
      calculateWidth()
    })

    if (aside) {
      resizeObserver.observe(aside)
    }

    calculateWidth()

    return () => {
      window.removeEventListener('resize', calculateWidth)
      resizeObserver.disconnect()
    }
  }, [])

  console.log(window.innerWidth)

  return width
}
