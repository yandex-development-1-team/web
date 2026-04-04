import { useCallback } from 'react'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'
import type { TDropzoneProps } from './Dropzone.types'

export const Dropzone = ({ accept, className, children, onFileAccepted }: TDropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0])
      }
    },
    [onFileAccepted]
  )

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    multiple: false,
    accept: accept,
    onDragOver: event => {
      if (isDragReject) {
        event.dataTransfer.dropEffect = 'none'
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(dropzoneOptions)

  return (
    <div
      className={`
        rounded-[8px] bg-white border-1 cursor-pointer
        ${isDragActive ? 'border-grey-dark' : 'border-grey-light'}
        hover:border-grey-dark transition-[border-color] duration-300 ease-in-out
        ${className}
      `}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  )
}
