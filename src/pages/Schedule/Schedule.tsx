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
    totalEvents,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleToggle,
    handlePickDate,
    handleSort,
    handlePerPage,
    handleLoadMore,
    handleSelect
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
              totalEvents={totalEvents}
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
              onSelect={handlePickDate}
              date={params.date_from}
              setPerPage={handlePerPage}
              pageSize={params.limit}
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
