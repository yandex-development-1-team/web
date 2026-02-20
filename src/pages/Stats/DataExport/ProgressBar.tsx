type TProgress = {
  progress: number
}

export const ProgressBar = ({ progress }: TProgress) => {
  return (
    <div className="w-full h-1">
      <div className={`bg-yellow-accent-dark h-full`} style={{ width: `${progress}%` }}></div>
    </div>
  )
}
