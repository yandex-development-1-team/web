import { DeleteIcon, DownloadIcon, CloseIcon } from '@/assets/icons'
import { ProgressBar } from './ProgressBar'
import { formatFileSize } from '@/lib/fileUtils/formatFileSize'
import type { IFileItem } from '../DataExport.types'
import { cn } from '@/lib/utils.clsx'
import { Button } from '@/components/ui'
import { useDownloadFile } from '../hooks/useDownloadFile'

export const FileItem = ({ file, onDelete, className, ...props }: IFileItem) => {
  const { id, name, size } = file
  const { start, cancel, progress, isDownloading } = useDownloadFile(id)

  const parsedSize = formatFileSize(size)

  return (
    <li
      className={cn(
        'relative',
        'flex flex-col gap-3',
        'p-3 w-full min-h-20.5',
        'border-b-2 border-grey-extra-light',
        `${className}`
      )}
      {...props}
    >
      <div className="flex flex-row gap-3 items-center justify-between">
        <Button variant={'ghost'} className="w-10.5 h-10.5 border" onClick={start}>
          <DownloadIcon />
        </Button>
        <div className="self-start w-76.5">
          <span className="block">{name}</span>
          <span className="block">{parsedSize}</span>
        </div>
        {isDownloading ? (
          <Button variant={'ghost'} className="w-8 h-8" onClick={cancel}>
            <CloseIcon />
          </Button>
        ) : (
          <Button variant={'ghost'} className="w-8 h-8" onClick={() => onDelete?.(id)}>
            <DeleteIcon />
          </Button>
        )}
      </div>
      {isDownloading && <ProgressBar progress={progress} />}
    </li>
  )
}
