import { BoxesIcon, CloseIcon, EditIcon } from '@/assets/icons'
import type { ManageButtonProps } from './ManageButton.types'

export const ManageButton = ({ onClick, onEdit, onDelete, text, className }: ManageButtonProps) => {
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onEdit) {
      e.preventDefault()
      e.stopPropagation()
      onEdit()
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onDelete) {
      e.preventDefault()
      e.stopPropagation()
      onDelete()
    }
  }

  const buttonClasses = `
    w-[44px] h-[44px]  flex items-center justify-center rounded-[8px] cursor-pointer hover:ring-1 hover:ring-yellow-light
    focus:ring-1 focus:ring-yellow-accent-dark active:bg-yellow-light
    transition-[background-color,shadow] duration-300 ease-in-out
  `

  return (
    <div
      role="button"
      onClick={onClick}
      className={`
        h-23 min-h-23 w-full px-[19px_15px] flex items-center text-text-grey-dark cursor-pointer
        border border-grey-extra-light rounded-lg
        transition-[outline-color] duration-300 ease-in-out
        outline-2 -outline-offset-2 outline-transparent
        hover:outline-grey-extra-light active:outline-grey-light
        ${className}
      `}
    >
      <BoxesIcon className="w-15" />
      <span
        className={`
        flex-1 text-left text-text button-text wrap-break-word max-h-18.5 my-2 mx-3 overflow-hidden
      `}
      >
        {text}
      </span>
      <div className="flex flex-row gap-3">
        <button onClick={handleEdit} className={buttonClasses}>
          <EditIcon className="w-6 h-6" color="var(--color-grey-dark)" />
        </button>

        <button onClick={handleDelete} className={buttonClasses}>
          <CloseIcon className="w-8 h-8" color="var(--color-grey-dark)" />
        </button>
      </div>
    </div>
  )
}
