import type { InlineStatusProps } from '../types'
import { Status } from './Status'

export const InlineStatus: React.FC<InlineStatusProps> = ({ initialStatus }) => {
  return (
    <div className="relative inline-block">
      <Status status={initialStatus} />
    </div>
  )
}
