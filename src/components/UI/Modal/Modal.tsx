import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  showBorders?: boolean
}

export const Modal = ({ isOpen, onClose, title, children, footer, showBorders = true }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-157 flex-col rounded-xl bg-white font-display shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <header
          className={`flex items-center justify-between px-6 py-5 ${showBorders ? 'border-b border-grey-blue-light' : ''}`}
        >
          {title && <h3 className="m-0 text-h3 font-bold text-text">{title}</h3>}

          <Button
            variant="ghost"
            size="icon-32"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="text-2xl text-grey-light hover:text-black"
          >
            &times;
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 text-text">{children}</div>

        {footer && (
          <footer
            className={`flex items-center justify-end gap-3 p-6 ${showBorders ? 'border-t border-grey-blue-light' : ''}`}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  )
}
