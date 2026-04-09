import { Loader } from '@/components/ui'
import type { FileUploaderPropsType } from '../DataExport.types'
import { FileItem } from './FileItem'

export const FileUploaderList = ({ files, isPending, onDelete, className, ...props }: FileUploaderPropsType) => {
  if (isPending) return <Loader />

  if (!Array.isArray(files) || !files.length)
    return <div className="p-4 text-center text-text-grey-dark">Список файлов пуст</div>

  return (
    <ul className={`flex flex-col gap-3 w-100 ${className}`} {...props}>
      {files.map(file => {
        return <FileItem key={file.id} onDelete={onDelete} file={file} />
      })}
    </ul>
  )
}
