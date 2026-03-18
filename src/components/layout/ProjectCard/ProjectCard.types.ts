import type { IProject } from '@/types/solutions'

export type ProjectCardProps = Omit<IProject, 'id'> & {
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}
