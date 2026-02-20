import type { ComponentProps } from 'react'
import { FileItem, type TFileItem } from './FileItem'

type TFileUploaderProps = {
  files: TFileItem[]
} & ComponentProps<'ul'>

export const FileUploderList = ({ files, className, ...props }: TFileUploaderProps) => {
  return (
    <ul className={`flex flex-col gap-3 w-100 ${className}`} {...props}>
      {files.map(file => {
        return <FileItem key={file.id} {...file}></FileItem>
      })}
    </ul>
  )
}
