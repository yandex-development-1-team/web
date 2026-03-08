import { CloseIcon } from '@/assets/icons'
import { Button } from '@/components/ui/Button'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full max-w-[651px] flex-col rounded-xl bg-white font-display shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <header
          className={`flex items-center justify-between pl-[24px] pr-[15px] py-[12px] ${showBorders ? 'border-b border-grey-blue-light' : ''}`}
        >
          {title && <h3 className="m-0 text-h3 text-text">{title}</h3>}

          <Button
            variant="ghost"
            size="icon-40"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="text-2xl text-text-grey-light hover:text-text"
          >
            <CloseIcon className="size-full" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto px-[24px] py-[19px] text-text">{children}</div>

        {footer && (
          <footer
            className={`flex items-center justify-end gap-3 px-[24px] py-[20px] ${showBorders ? 'border-t border-grey-blue-light' : ''}`}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  )
}
