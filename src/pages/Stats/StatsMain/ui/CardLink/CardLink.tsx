import { Link } from 'react-router-dom'
import type { CardLinkType } from './CardLink.types'
import { cardLinkDetailsStyles, cardLinkStyles } from './CardLink.styles'

export const CardLink = ({
  to,
  icon: Icon,
  title,
  description,
  detailsLabel = 'Подробнее',
  iconSize
}: CardLinkType) => {
  return (
    <Link to={to}>
      <article className={cardLinkStyles} style={{ paddingTop: iconSize ? Math.round(-0.615 * iconSize + 40) : 20 }}>
        <div className="flex flex-col" style={{ gap: iconSize ? Math.round(-0.615 * iconSize + 40) : 20 }}>
          <Icon
            className="text-grey-dark"
            width={iconSize ?? 32}
            height={iconSize ?? 32}
            style={{ marginLeft: iconSize ? Math.round(-0.769 * iconSize + 24.615) : 0 }}
          />
          <div className="flex flex-col gap-[10px]">
            <h4 className="text-h4sb text-black-dark">{title}</h4>
            <p className="text-h5">{description}</p>
          </div>
        </div>
        <div className={cardLinkDetailsStyles}>{detailsLabel}</div>
      </article>
    </Link>
  )
}
