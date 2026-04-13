import { EditIcon, MoreVerticalIcon, PhoneIcon } from '@/assets/icons'
import type { ContactType, TeammateCardType } from './TeammateCard.types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/CalendarInput/ui/Popover'
import { useState } from 'react'

export const TeammateCard = ({ name, grade, isActive, email, phone }: TeammateCardType) => {
  const [open, setOpen] = useState<boolean>(false)

  const contacts: ContactType[] = [
    {
      link: email,
      action: 'Написать',
      Icon: EditIcon,
      iconClassName: 'w-[16px]'
    },
    {
      link: phone,
      action: 'Позвонить',
      Icon: PhoneIcon,
      iconClassName: 'w-[32px] -mr-[6px]'
    }
  ]

  return (
    <div className="flex items-start justify-between pb-[9px] border-b border-grey-light">
      <div className="flex gap-[9px]">
        <div
          className={`${isActive ? 'bg-yellow-accent-dark' : 'bg-grey-extra-light'} h-[14px] w-[14px] rounded-full mt-[4px] ml-[4px]`}
        />
        <div className="flex flex-col gap-[4px]">
          <span className="text-xs">{name}</span>
          <span className="text-xxs">{`Менеджер ${grade} звена`}</span>
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <MoreVerticalIcon width={20} className="cursor-pointer" onClick={() => setOpen(true)} />
        </PopoverTrigger>

        <PopoverContent
          className="w-[144px] bg-white border border-grey-light px-[12px] py-[10px] z-100 rounded-[8px] shadow-(--popover-shadow)"
          align="end"
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <ul className="flex flex-col gap-[10px]">
            {contacts.map(({ link, action, Icon, iconClassName }) => (
              <li>
                <a href={link} className="flex justify-between items-center">
                  <span className="text-xs text-text">{action}</span>
                  <Icon color="var(--color-grey-dark)" className={iconClassName} />
                </a>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
