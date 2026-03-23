import { indicators } from './usersStatsData'
import { mockUsersIndicatorsValues } from '@/mockData/mockUsersStatsPageData'

const UsersStats = () => {
  return (
    <>
      <div className="bg-white text-text-black-dark px-[20px] pb-[20px] rounded-[8px]">
        <h2 className="text-h2 py-[18px_13px]">Аналитика пользователей</h2>
        <h4 className="text-h4sb pb-[14px]">Сводка</h4>
        <div className="flex text-text gap-[20px]">
          {indicators.map(indicator => (
            <div className="flex-1" key={indicator.id}>
              <p className="text-xxs pb-[7px]">{indicator.name}</p>
              <div
                className={`
                border-1 border-grey-light rounded-[8px] text-indicator text-center py-[30px]
                ${indicator.warningColor && 'text-text-error'}
              `}
              >
                {mockUsersIndicatorsValues.find(el => el.id === indicator.id)?.value || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols gap-[20px] bg-white text-text-black-dark px-[20px] pb-[20px] mt-[20px] rounded-[8px]">
        <div className=" grid grid-cols-1 min-[1050px]:grid-cols-[1fr_222px] gap-5 items-end mt-8"></div>
        <div></div>
      </div>
    </>
  )
}

export const Component = UsersStats
