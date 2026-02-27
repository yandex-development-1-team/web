import type { TFileUploaderProps } from '../DataExport.types'
import { FileItem } from './FileItem'

export const FileUploderList = ({ files, onDelete, className, ...props }: TFileUploaderProps) => {
  if (!Array.isArray(files) || !files.length)
    return <div className="p-4 text-center text-grey-dark">Список файлов пуст</div>

  return (
    <ul className={`flex flex-col gap-3 w-100 ${className}`} {...props}>
      {files.map(file => {
        return <FileItem key={file.id} onDelete={onDelete} file={file} />
      })}
    </ul>
  )
}
