type TProgress = {
  progress: number
}

export const ProgressBar = ({ progress }: TProgress) => {
  const isIndeterminate = progress === 0
  return (
    <div className="w-full relative h-1 overflow-hidden">
      {isIndeterminate ? (
        <div className="animate-slow-slide w-5/10 h-1 rounded bg-yellow-accent-dark" />
      ) : (
        <div className={`bg-yellow-accent-dark h-full`} style={{ width: `${progress}%` }}></div>
      )}
    </div>
  )
}
