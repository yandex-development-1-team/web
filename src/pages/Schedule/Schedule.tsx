import { SORT_OPTIONS } from '@/pages/Schedule/config'
import { useSchedule } from '@/pages/Schedule/hooks/useSchedule'
import { ScheduleCalendar, ScheduleControl, ScheduleTable } from '@/pages/Schedule/ui'

const Schedule = () => {
  const {
    toggle,
    columnTable,
    columnCalendar,
    params,
    events,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleToggle,
    handlePickDate,
    handleSort,
    handleLoadMore,
    handleSelect,
    pagination
  } = useSchedule()

  return (
    <>
      <div className="bg-white text-text-black-dark p-[18px_20px] rounded-md">
        <h1 className="text-h2">Управление расписанием</h1>
      </div>

      <div className="bg-white text-text-black-dark p-[18px_20px] my-5 rounded-md">
        <ScheduleControl options={SORT_OPTIONS} onSelect={handleSort} onToggle={handleToggle} />

        <div className="mt-8">
          {toggle === 'left' ? (
            <ScheduleTable
              optionColums={columnTable}
              events={events}
              loadedCount={events.length}
              onSelect={handleSelect}
              onLoadMore={handleLoadMore}
              hasMore={hasNextPage}
              isLoadingMore={isFetchingNextPage}
              isLoading={isLoading}
            />
          ) : (
            <ScheduleCalendar
              optionColums={columnCalendar}
              events={events}
              params={params}
              pagination={pagination}
              onSelect={handlePickDate}
              onLoadMore={handleLoadMore}
              hasMore={hasNextPage}
              isLoading={isLoading}
              isLoadingMore={isFetchingNextPage}
            />
          )}
        </div>
      </div>
    </>
  )
}

export const Component = Schedule
