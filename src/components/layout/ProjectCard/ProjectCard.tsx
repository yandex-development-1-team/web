import { Button } from '@/components/ui'
import { Edit2Icon, Delete2Icon } from '@/assets/icons'
import type { ProjectCardProps } from './ProjectCard.types'

export const ProjectCard = ({
  onClick,
  onEdit,
  onDelete,
  title,
  description,
  image,
  isActive,
  className,
  style
}: ProjectCardProps) => {
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

  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        h-[377px] w-full max-w-[344px] flex flex-col text-text cursor-pointer
        rounded-[8px] bg-white px-[20px]
        transition-[outline-color] duration-300 ease-in-out
        outline-1 outline-offset-[-1px] outline-transparent
        hover:outline-grey-light active:outline-grey-dark
        ${className}
      `}
    >
      <div className="py-[20px_11px] min-h-[179px] flex flex-col items-center justify-center">
        <div className="relative inline-block">
          <img className="max-h-[148px] object-contain block" src={image} />
          <p
            className={`
            absolute top-[12px] right-[12px] whitespace-nowrap text-h5 rounded-[4px]
            px-[12px] py-[2px_1px]
            ${isActive ? 'bg-yellow-light' : 'bg-grey-light'}
          `}
          >
            {isActive ? 'Активен в боте' : 'Не активен в боте'}
          </p>
        </div>
      </div>

      <p className="text-h4sb text-left min-h-[30px] h-[30px] mb-[9px] line-clamp-1">{title}</p>
      <p className="text-xs text-left min-h-[73px] h-[73px] mb-[3px] overflow-hidden">{description}</p>
      <div className="ml-[-20px] w-[calc(100%+40px)] border-b-1 border-grey-extra-light"></div>
      <div className="py-[19px_20px] px-[6px] flex justify-between gap-[20px]">
        {(onEdit && (
          <Button className="max-w-[106px] w-[106px] max-h-[43px] h-[43px]" variant={'primary'} onClick={handleEdit}>
            <Edit2Icon className="min-w-[18px] min-h-[18px]" />
          </Button>
        )) || <div />}
        {onDelete && (
          <Button
            className="max-w-[106px] w-[106px] max-h-[43px] h-[43px]"
            variant={'secondary'}
            onClick={handleDelete}
          >
            <Delete2Icon className="min-w-[22px] min-h-[22px]" />
          </Button>
        )}
      </div>
    </div>
  )
}
