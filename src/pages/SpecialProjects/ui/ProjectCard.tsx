import { Delete2Icon, Edit2Icon } from '@/assets/icons'
import { Button } from '@/components/ui'
import imgFallback from '@/mockData/box_image_placeholder.png'
import { StatusLabel } from './StatusLabel'

interface ProjectCardProps {
  title: string
  descriptioin: string
  status: boolean
  image?: string | null
  className?: string
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
}

export function ProjectCard({ title, descriptioin, image, status, onDelete, onEdit }: ProjectCardProps) {
  return (
    <div className="rounded-lg max-w-105 p-6 bg-white relative">
      <div className="h-37 rounded-lg overflow-hidden bg-cover mb-3 relative">
        <StatusLabel isActive={status} className="top-3 right-4" />
        <img src={image ?? imgFallback} alt="image" />
      </div>
      <div className="flex flex-col gap-3 min-h-28">
        <h3 className="text-h4sb line-clamp-1">{title}</h3>
        <p className="text-xs">{descriptioin}</p>
      </div>
      <div className="border-t border-t-grey-extra-light py-5 px-6.5 -mx-6 flex items-center justify-between">
        <Button className="px-10 py-2.5" onClick={onEdit}>
          <Edit2Icon className="size-6" />
        </Button>
        <Button variant={'secondary'} className="px-10 py-2.5" onClick={onDelete}>
          <Delete2Icon className="size-6" />
        </Button>
      </div>
    </div>
  )
}
