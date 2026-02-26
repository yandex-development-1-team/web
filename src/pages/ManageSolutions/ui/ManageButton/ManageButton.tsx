import { BoxesIcon, EditIcon, CloseIcon } from '@/assets/icons'
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
    w-[44px] h-[44px] flex hover:text-text-grey-light
    active:text-text transition-[color] duration-300 ease-in-out
  `

  return (
    <button
      onClick={onClick}
      className={`
        h-[92px] w-full px-[19px_15px] flex items-center text-text-grey-dark cursor-pointer
        border-1 border-grey-extra-light rounded-[8px]
        transition-[outline-color] duration-300 ease-in-out
        outline-2 outline-offset-[-2px] outline-transparent
        hover:outline-grey-extra-light active:outline-grey-light
        ${className}
      `}
    >
      <BoxesIcon className="w-[60px] mr-[12px]" />
      <span className="flex-1 text-left text-text text-button">{text}</span>
      <div onClick={handleEdit} className={buttonClasses}>
        <EditIcon className="w-[24px]" />
      </div>
      <div onClick={handleDelete} className={buttonClasses}>
        <CloseIcon className="w-[32px]" />
      </div>
    </button>
  )
}
