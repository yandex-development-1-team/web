import { BoxButton } from '@/components/ui'
import { indicators } from './solutionsData'
import { mockIndicatorsValues, mockBoxes, mockProjects } from '@/mockData/mockManageSolutionsPageData'
import { ManageButton } from './ui/ManageButton'

const ManageSolutions = () => {
  const handleBoxCreate = () => {}

  const handleBoxEdit = (id: number) => {
    console.log(id)
  }

  const handleBoxDelete = (id: number) => {
    console.log(id)
  }

  const handleProjectCreate = () => {}

  const handleProjectEdit = (id: number) => {
    console.log(id)
  }

  const handleProjectDelete = (id: number) => {
    console.log(id)
  }

  return (
    <>
      <div className="bg-white text-text-black-dark px-[20px] pb-[20px] rounded-[8px]">
        <h2 className="text-h2 py-[18px_13px]">Управление коробками и спецпроектами</h2>
        <h4 className="text-h4sb pb-[14px]">Сводка дня</h4>
        <div className="flex text-text gap-[20px]">
          {indicators.map((indicator, index) => (
            <div className="flex-1" key={index}>
              <p className="text-xxs pb-[7px]">{indicator.name}</p>
              <div
                className={`
                border-1 border-grey-light rounded-[8px] text-indicator text-center py-[30px]
                ${indicator.warningColor && 'text-text-error'}
              `}
              >
                {mockIndicatorsValues.find(el => el.id === indicator.id)?.value || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`bg-white rounded-[8px] h-full p-[20px] pt-[19px] mt-[20px] flex-1 text-text`}>
        <h4 className="text-h4sb text-text-black-dark pb-[18px]">Список коробок и спецпроектов</h4>
        <div className="grid grid-cols-2 gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <BoxButton className="text-button" icon={'box'} onClick={handleBoxCreate}>
              Создать коробку
            </BoxButton>
            {mockBoxes.map((box, index) => (
              <ManageButton
                key={index}
                text={box.name}
                onClick={() => handleBoxEdit(box.id)}
                onDelete={() => handleBoxDelete(box.id)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-[20px]">
            <BoxButton className="text-button" icon={'special_projects'} onClick={handleProjectCreate}>
              Создать спецпроект
            </BoxButton>
            {mockProjects.map((project, index) => (
              <ManageButton
                key={index}
                text={project.name}
                onClick={() => handleProjectEdit(project.id)}
                onDelete={() => handleProjectDelete(project.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const Component = ManageSolutions
