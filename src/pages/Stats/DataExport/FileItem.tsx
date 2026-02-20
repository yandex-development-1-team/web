import type { ComponentProps } from 'react'
import { DownloadIcon } from '@/assets/icons'
import { CloseIcon } from '@/assets/icons'
import { DeleteIcon } from '@/assets/icons'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { ProgressBar } from './ProgressBar'

export type TFileItem = {
  id: string
  name: string
  size: number
  status: 'idle' | 'uploading'
} & ComponentProps<'li'>

export const FileItem = ({ name, size, key, className, status, ...props }: TFileItem) => {
  return (
    <li
      key={key}
      className={cn(`flex flex-col gap-24 p-3 w-full h-20.5 border-b-2 border-grey-extra-light ${className}`)}
      {...props}
    >
      <div className="flex flex-row gap-3 items-center justify-between">
        <Button variant={'ghost'} className="w-10.5 h-10.5 border">
          <DownloadIcon />
        </Button>
        <div className="self-start w-76.5">
          <p>{name}</p>
          <p>{size}</p>
        </div>
        <Button variant={'ghost'} className="w-6 h-6">
          {status === 'uploading' ? <CloseIcon /> : <DeleteIcon />}
        </Button>
      </div>
      {status === 'uploading' && <ProgressBar></ProgressBar>}
    </li>
  )
}
