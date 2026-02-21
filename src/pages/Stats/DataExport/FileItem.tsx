import type { ComponentProps } from 'react'
import { DownloadIcon } from '@/assets/icons'
import { CloseIcon } from '@/assets/icons'
import { DeleteIcon } from '@/assets/icons'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { ProgressBar } from './ProgressBar'
import { formatFileSize } from '@/lib/fileUtils/formatFileSize'

export type TFileItem = {
  id: string
  name: string
  size: number
  status: 'idle' | 'downloading'
} & ComponentProps<'li'>

export const FileItem = ({ name, size, className, status, ...props }: TFileItem) => {
  const parsedSize = formatFileSize(size)
  return (
    <li
      className={cn(
        'flex flex-col gap-3',
        'p-3 w-full min-h-20.5',
        'border-b-2 border-grey-extra-light',
        `${className}`
      )}
      {...props}
    >
      <div className="flex flex-row gap-3 items-center justify-between">
        <Button variant={'ghost'} className="w-10.5 h-10.5 border">
          <DownloadIcon />
        </Button>
        <div className="self-start w-76.5">
          <span className="block">{name}</span>
          <span className="block">{parsedSize}</span>
        </div>
        <Button variant={'ghost'} className="w-8 h-8">
          {status === 'downloading' ? <CloseIcon /> : <DeleteIcon />}
        </Button>
      </div>
      {status === 'downloading' && <ProgressBar progress={0} />}
    </li>
  )
}
