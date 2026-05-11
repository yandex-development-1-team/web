import { useRef, useState, useEffect, useCallback } from 'react'
import { Switch, ToggleButton, Button, Loader } from '@/components/ui'
import { ArrowIcon } from '@/assets/icons'
import { accounts, accessRightsGroups, accessRights, textFields } from './settingsData'
import { useMessages } from './hooks/useMessages'
import { useAccessSettings } from '@/hooks/useAccessSettings'
import type { ITextFieldValue, TPhase } from './Settings.types'

const Settings = () => {
  const [phase, setPhase] = useState<TPhase>('roleSelection')
  const [editingAccountId, setEditingAccountId] = useState(0)
  const [switchesState, setSwitchesState] = useState<Record<number, boolean>>({})
  const textFieldsRefs = useRef<Record<number, HTMLTextAreaElement | null>>({})

  const {
    messages: serverTextFieldsValues,
    updateMessages,
    isLoadingMessages,
    isFetchingMessages,
    isUpdatingMessages
  } = useMessages()

  const currentRoleServerName = accounts.find(account => account.id === editingAccountId)?.serverName

  const {
    accessSettings: serverAccessSettings,
    updateAccessSettings,
    isLoadingAccessSettings,
    isFetchingAccessSettings,
    isUpdatingAccessSettings
  } = useAccessSettings(currentRoleServerName)

  const buttonsDisabled =
    isLoadingMessages ||
    isFetchingMessages ||
    isUpdatingMessages ||
    isLoadingAccessSettings ||
    isFetchingAccessSettings ||
    isUpdatingAccessSettings

  const handleSettingsGroupSelect = (selectedSide: 'left' | 'right') => {
    if (!(selectedSide === 'left' && phase !== 'textsSetup')) {
      setPhase(selectedSide === 'left' ? 'roleSelection' : 'textsSetup')
    }
  }

  const handleRoleSelect = (roleId: number) => {
    setEditingAccountId(roleId)
    setPhase('accessSetupLoading')
  }

  const handleRoleDeselect = () => {
    setPhase('roleSelection')
  }

  const saveTextFieldsValues = () => {
    const dataToSave: ITextFieldValue[] = textFields.map(field => ({
      id: field.id,
      value: textFieldsRefs.current[field.id]?.value || ''
    }))
    updateMessages(dataToSave)
  }

  const loadTextFieldsValues = () => {
    if (!serverTextFieldsValues) return
    serverTextFieldsValues.forEach(item => {
      const inputElement = textFieldsRefs.current[item.id]
      if (inputElement) {
        inputElement.value = item.value
      }
    })
  }

  const saveSwitchesStates = (values: Record<number, boolean>) => {
    if (!currentRoleServerName) return
    const selectedAccessRights = accessRights.filter(right => !!values[right.id]).map(right => right.serverName)
    updateAccessSettings({
      data: selectedAccessRights,
      roleServerId: currentRoleServerName
    })
  }

  const handleSaveValues = () => {
    if (phase === 'textsSetup') {
      saveTextFieldsValues()
    } else {
      saveSwitchesStates(switchesState)
    }
  }

  const handleResetValues = () => {
    if (phase === 'textsSetup') {
      loadTextFieldsValues()
    } else {
      loadSwitchesStates()
    }
  }

  const loadSwitchesStates = useCallback(() => {
    const newStates: Record<number, boolean> = {}
    accessRights.forEach(accessRight => {
      const isEnabled = serverAccessSettings ? serverAccessSettings.includes(accessRight.serverName) : false
      newStates[accessRight.id] = isEnabled
    })
    setSwitchesState(newStates)
  }, [serverAccessSettings])

  const handleSwitch = (accessRightId: number, newState: boolean) => {
    setSwitchesState(currentState => ({
      ...currentState,
      [accessRightId]: newState
    }))
  }

  useEffect(() => {
    if (phase === 'accessSetupLoading' && !isFetchingAccessSettings) {
      loadSwitchesStates()
      setTimeout(() => {
        setPhase('accessSetup')
      }, 0)
    }
  }, [isFetchingAccessSettings, phase, loadSwitchesStates])

  return (
    <>
      <h2 className="bg-white text-text-black-dark text-h2 p-[18px_20px] rounded-[8px]">Системные настройки</h2>

      <div
        className={`
          ${!(phase === 'accessSetup') ? 'bg-white' : ''}
          transition-[background-color] duration-300 ease-in-out
          rounded-[8px] h-full mt-[20px] flex-1 text-text
        `}
      >
        <div
          className={`
            flex flex-wrap min-h-[46px] justify-between
            transition-[margin] duration-300 ease-in-out
            ${phase !== 'accessSetup' ? (phase === 'textsSetup' ? 'm-[20px] mb-0' : 'm-[20px] mb-[12px]') : 'm-0'}
          `}
        >
          <ToggleButton
            className="w-[562px]! mr-[20px] min-w-[488px] mb-5"
            leftLabel="Настройка уровня доступа"
            rightLabel="Настройка текстов"
            onToggle={handleSettingsGroupSelect}
          />
          <div
            className={`
              overflow-y-hidden
              transition-[height,margin] duration-300 ease-in-out
              ${!(phase === 'roleSelection' || phase === 'accessSetupLoading') ? 'h-[46px] mb-5' : 'h-0 mb-0'}
            `}
          >
            <Button
              label="Отменить"
              variant="secondary"
              onClick={handleResetValues}
              className="w-[168px] mr-[20px] min-h-[46px]"
              disabled={buttonsDisabled}
            />
            <Button
              label="Сохранить"
              onClick={handleSaveValues}
              className="w-[168px] min-h-[46px]"
              disabled={buttonsDisabled}
            />
          </div>
        </div>

        <div
          className={`
            mt-0 overflow-y-hidden transition-[height] duration-300 ease-in-out
            ${
              phase === 'roleSelection' || phase === 'accessSetupLoading'
                ? 'h-[484px]'
                : phase === 'accessSetup'
                  ? 'h-[102px]'
                  : 'h-0'
            }
          `}
        >
          {accounts.map((account, index) => (
            <button
              key={index}
              type="button"
              className={`
                ${phase === 'accessSetup' ? 'w-[100%] m-0 bg-white' : 'w-[calc(100%-20px*2)] m-[20px] mt-0'}
                flex overflow-y-hidden border-1 border-yellow-accent-light rounded-[8px]
                justify-between items-center hover:border-yellow-light active:border-yellow-accent-dark
                cursor-pointer relative
                transition-[width,height,margin,padding,background-color,border-color] duration-300 ease-in-out
                ${
                  (phase === 'accessSetup' && account.id === editingAccountId) ||
                  phase === 'roleSelection' ||
                  phase === 'accessSetupLoading'
                    ? 'h-[101px] p-[20px]'
                    : 'h-0 p-0 border-transparent! bg-transparent! mt-[-2px]'
                }
              `}
              onClick={phase === 'accessSetup' ? handleRoleDeselect : () => handleRoleSelect(account.id)}
            >
              <div className="flex flex-col items-start">
                <span className="text-h3 text-text mt-[-3px]">{account.name}</span>
                <span className="text-h4sb text-text-grey-dark mt-[-3px]">{account.description}</span>
              </div>
              {isFetchingAccessSettings && editingAccountId === account.id && <Loader className="absolute inset-0" />}
              <ArrowIcon
                className={`
                  w-[23px] text-text-grey-dark mr-[9px]
                  transition-transform duration-300 ease-in-out
                  ${phase === 'accessSetup' ? 'rotate-180' : ''}
                `}
              />
            </button>
          ))}
        </div>

        <div
          className={`
            overflow-y-hidden transition-[height] duration-300 ease-in-out
            ${phase === 'textsSetup' ? 'h-[672px]' : 'h-0'}
          `}
        >
          {textFields.map((field, index) => (
            <div
              key={index}
              className={`
                flex flex-col m-[16px_20px]
                ${index === 0 ? 'mt-0' : ''}
              `}
            >
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
                  textFieldsRefs.current[field.id] = el
                }}
                placeholder="Место для текста"
                className={`
                  h-[60px] resize-none
                  outline-0 border-1 border-grey-dark text-text text-h5 rounded-[8px] p-[10px_12px]
                  transition-[border-color] duration-300 ease-in-out
                  hover:border-grey-dark
                  active:border-grey-dark
                  placeholder-shown:border-grey-light
                  placeholder:italic
                  placeholder:text-small
                  placeholder:text-text-grey-light
                  placeholder:border-grey-light
                  hover:placeholder:text-text-grey-dark
                `}
                defaultValue={serverTextFieldsValues?.find(value => value.id === field.id)?.value || ''}
              />
            </div>
          ))}
        </div>

        <div
          className={`
            bg-white rounded-[8px] flex-1 
            overflow-y-hidden transition-[height,padding,margin] duration-300 ease-in-out
            ${
              phase === 'accessSetup' ? 'h-[1252px] [@media(min-width:1244px)]:h-[656px] p-[20px] mt-2' : 'h-0 p-0 mt-0'
            }
          `}
        >
          <div className="flex flex-col flex-wrap content-start [@media(min-width:1244px)]:max-h-[616px] gap-x-[60px]">
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
                <div key={groupIndex} className={`${mbClass} min-w-[362px] px-[20px]`}>
                  <h5 className="text-h5 h-[40px] mb-[12px] flex items-center">{group.name}</h5>
                  <div className="flex flex-col gap-[8px]">
                    {accessRights
                      .filter(accessRight => accessRight.groupId === group.id)
                      .map((accessRight, index) => (
                        <div key={index} className="h-[40px] ml-[40px] flex items-center gap-[12px]">
                          <Switch
                            checked={switchesState[accessRight.id]}
                            onChange={newState => handleSwitch(accessRight.id, newState)}
                            disabled={editingAccountId === 0}
                            disabledColorful={editingAccountId === 0}
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
      </div>
    </>
  )
}

export const Component = Settings
