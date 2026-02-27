export const ProgressBar = ({ progress = 0 }: { progress: number }) => {
  const isIndeterminate = progress === 0
  console.log('progress', progress)
  return (
    <div className="w-full absolute h-1 overflow-hidden bottom-1">
      {isIndeterminate ? (
        <div className="animate-slow-slide w-5/10 h-1 rounded bg-yellow-accent-dark" />
      ) : (
        <div
          className={`bg-yellow-accent-dark h-full transition-all duration-400 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </div>
  )
}
