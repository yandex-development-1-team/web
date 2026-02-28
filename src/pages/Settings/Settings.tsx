import { useRef, useState } from 'react'
import { Switch, ToggleButton, Button } from '@/components/ui'
import { ArrowIcon } from '@/assets/icons'
import { accounts, accessRightsGroups, accessRights, textFields } from './settingsData'
import { mockTextFieldsValues, mockAccountAccessRights } from '@/mockData/mockSettingsPageData'

const Settings = () => {
  const [phase, setPhase] = useState('roleSelection')
  const [editingAccountId, setEditingAccountId] = useState(0)
  const [switchesState, setSwitchesState] = useState<boolean[]>([])

  const textFieldsRefs = useRef<HTMLTextAreaElement[]>([])

  const handleSettingsGroupSelect = (selectedSide: 'left' | 'right') => {
    if (!(selectedSide === 'left' && phase !== 'textsSetup')) {
      setPhase(selectedSide === 'left' ? 'roleSelection' : 'textsSetup')
    }
  }

  const handleRoleSelect = (roleId: number) => {
    setEditingAccountId(roleId)
    loadSwitchesStates(roleId)
    setPhase('accessSetup')
  }

  const handleRoleDeselect = () => {
    setPhase('roleSelection')
  }

  const saveTextFieldsValues = () => {
    const values = textFieldsRefs.current.map(ref => ref.value || '')
    mockTextFieldsValues.forEach(element => {
      if (values[element.id]) {
        element.value = values[element.id]
      } else {
        element.value = ''
      }
    })
  }

  const loadTextFieldsValues = () => {
    textFieldsRefs.current.forEach((ref, index) => {
      const value = mockTextFieldsValues.find(value => value.id === index)?.value
      if (value) {
        ref.value = value
      } else {
        ref.value = ''
      }
    })
  }

  const saveSwitchesStates = (accountId: number, values: boolean[]) => {
    mockAccountAccessRights
      .find(account => account.accountId === accountId)
      ?.accessRights.forEach(elem => {
        if (values[elem.id] === true || values[elem.id] === false) {
          elem.value = values[elem.id]
        } else {
          elem.value = false
        }
      })
  }

  const handleSaveValues = () => {
    if (phase === 'textsSetup') {
      saveTextFieldsValues()
    } else {
      saveSwitchesStates(editingAccountId, switchesState)
    }
  }

  const handleResetValues = () => {
    if (phase === 'textsSetup') {
      loadTextFieldsValues()
    } else {
      loadSwitchesStates(editingAccountId)
    }
  }

  const loadSwitchesStates = (roleId: number) => {
    const accessArray = new Array(accessRights.length).fill(false)
    accessRights.forEach(accessRight => {
      const currentAccessRightId = accessRight.id
      const loadedAccessRight = mockAccountAccessRights
        .find(account => account.accountId === roleId)
        ?.accessRights.find(elem => elem.id === currentAccessRightId)?.value
      accessArray[currentAccessRightId] = loadedAccessRight
    })
    setSwitchesState(accessArray)
  }

  const handleSwitch = (accessRightId: number, newState: boolean) => {
    setSwitchesState(currentState => {
      return [...currentState.slice(0, accessRightId), newState, ...currentState.slice(accessRightId + 1)]
    })
  }

  return (
    <>
      <h2 className="bg-white text-text-black-dark text-h2 p-[18px_20px] rounded-[8px]">Системные настройки</h2>

      <div
        className={`
          ${phase !== 'accessSetup' ? 'bg-white' : ''}
          rounded-[8px]
          h-full
          mt-[20px]
          flex-1
          text-text
        `}
      >
        <div
          className={`
            flex
            flex-wrap
            min-h-[46px]
            gap-[20px]
            justify-between
            ${phase !== 'accessSetup' && 'm-[20px]'}
          `}
        >
          <ToggleButton
            className="w-[562px]! mr-[20px] min-w-[488px]"
            leftLabel="Настройка уровня доступа"
            rightLabel="Настройка текстов"
            onToggle={handleSettingsGroupSelect}
          />
          {phase !== 'roleSelection' && (
            <div>
              <Button
                label="Отменить"
                variant="secondary"
                onClick={handleResetValues}
                className="w-[168px] mr-[20px] min-h-[46px]"
              />
              <Button label="Сохранить" onClick={handleSaveValues} className="w-[168px] min-h-[46px]" />
            </div>
          )}
        </div>

        {phase === 'roleSelection' && (
          <div className="mt-[32px]">
            {accounts.map((account, index) => (
              <button
                key={index}
                type="button"
                className={`
                  h-[101px]
                  w-[calc(100%-20px*2)]
                  flex
                  p-[20px]
                  m-[20px]
                  border-1
                  border-yellow-accent-light
                  rounded-[8px]
                  justify-between
                  items-center
                  hover:border-yellow-light
                  active:border-yellow-accent-dark
                  cursor-pointer
                `}
                onClick={() => handleRoleSelect(account.id)}
              >
                <div className="flex flex-col items-start">
                  <span className="text-h3 text-text mt-[-3px]">{account.name}</span>
                  <span className="text-h4sb text-text-grey-dark mt-[-3px]">{account.description}</span>
                </div>
                <ArrowIcon className="w-[23px] text-text-grey-dark mr-[9px]" />
              </button>
            ))}
          </div>
        )}

        {phase === 'textsSetup' &&
          textFields.map((field, index) => (
            <div key={index} className="flex flex-col m-[16px_20px]">
              <span className="text-text-grey-dark text-xxs pb-[2px]">{field.name}</span>
              <style>
                {`
                  textarea::placeholder {
                    transition: color 0.3s ease-in-out;
                  }
                `}
              </style>
              <textarea
                ref={el => {
                  textFieldsRefs.current[field.id] = el!
                }}
                placeholder="Место для текста"
                className={`
                  h-[60px]
                  resize-none
                  outline-0
                  border-1
                  border-grey-dark
                  text-text
                  text-h5
                  rounded-[8px]
                  p-[10px_12px]
                  transition-[border-color]
                  duration-300
                  ease-in-out
                  hover:border-grey-dark
                  active:border-grey-dark
                  placeholder-shown:border-grey-light
                  placeholder:italic
                  placeholder:text-small
                  placeholder:text-text-grey-light
                  placeholder:border-grey-light
                  hover:placeholder:text-text-grey-dark
                `}
                defaultValue={mockTextFieldsValues.find(value => value.id === index)?.value}
              />
            </div>
          ))}

        {phase === 'accessSetup' && (
          <>
            <button
              type="button"
              className={`
                h-[101px]
                w-[100%]
                flex
                p-[20px]
                my-[20px_8px]
                border-1
                border-yellow-accent-light
                rounded-[8px]
                justify-between
                items-center
                hover:border-yellow-light
                active:border-yellow-accent-dark
                bg-white
                cursor-pointer
              `}
              onClick={handleRoleDeselect}
            >
              <div className="flex flex-col items-start">
                <span className="text-h3 text-text mt-[-3px]">
                  {accounts.find(value => value.id === editingAccountId)?.name}
                </span>
                <span className="text-h4sb text-text-grey-dark mt-[-3px]">
                  {accounts.find(value => value.id === editingAccountId)?.description}
                </span>
              </div>
              <ArrowIcon className="w-[23px] text-text-grey-dark mr-[9px] rotate-180" />
            </button>

            <div className="bg-white rounded-[8px] flex-1 p-[20px]">
              <div className="flex flex-col flex-wrap content-start [@media(min-width:1220px)]:max-h-[616px]">
                {accessRightsGroups.map((group, groupIndex) => {
                  let mbClass
                  switch (groupIndex) {
                    case 1:
                      mbClass = 'mb-[12px]'
                      break
                    case 4:
                      mbClass = 'mb-[40px]'
                      break
                    default:
                      mbClass = 'mb-[20px]'
                  }
                  return (
                    <div key={groupIndex} className={`${mbClass} min-w-[462px] pl-[20px] `}>
                      <h5 className="text-h5 h-[40px] mb-[12px] flex items-center">{group.name}</h5>
                      <div className="flex flex-col gap-[8px]">
                        {accessRights
                          .filter(accessRight => accessRight.groupId === group.id)
                          .map((accessRight, index) => (
                            <div key={index} className="h-[40px] ml-[40px] flex items-center gap-[12px]">
                              <Switch
                                checked={switchesState[accessRight.id]}
                                onChange={newState => handleSwitch(accessRight.id, newState)}
                              />
                              <span className="text-h5">{accessRight.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export const Component = Settings
