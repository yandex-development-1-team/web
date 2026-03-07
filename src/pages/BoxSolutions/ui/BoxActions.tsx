import { DeleteIcon, EditIcon } from '@/assets/icons'
import { Button } from '@/components/ui'

type BoxActionsPropsType = {
  onEdit: () => void
  onDelete: () => void
}

export const BoxActions = ({ onEdit, onDelete }: BoxActionsPropsType) => {
  return (
    <div className="flex justify-between text-text">
      <Button variant={'default'} className="min-w-26.5 min-h-11" onClick={onEdit}>
        <EditIcon />
      </Button>
      <Button variant={'outline'} className="min-w-26.5 min-h-11" onClick={onDelete}>
        <DeleteIcon />
      </Button>
    </div>
  )
}
