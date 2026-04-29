import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router/routes'
import { Button } from '@/components/ui'
import backgroundImage from '@/assets/images/Background.jpg'
import type { ErrorPageTemplateProps } from './ErrorPageTemplate.types'

const ErrorPageTemplate = ({ title, text, image, code }: ErrorPageTemplateProps) => {
  const navigate = useNavigate()

  const handleReturnBack = () => {
    navigate(-1)
  }

  const handleReturnToMain = () => {
    navigate(ROUTES.home)
  }

  return (
    <div className={`bg-white rounded-[8px] h-full flex-1 text-text flex flex-col`}>
      <h2 className="text-text-black-dark text-h2 p-[18px_20px]">{title}</h2>
      <div className={`p-[20px] grid grid-cols-[1fr_3fr] justify-items-center gap-[24px] items-center h-full`}>
        <div className="flex flex-col items-center gap-[24px]">
          <span className="text-h4sb text-center">{text}</span>
          <img src={image} />
          <Button type="button" label="Назад" variant="secondary" onClick={handleReturnBack} size="normal" />
          <Button type="button" label="На главную" variant="primary" onClick={handleReturnToMain} size="normal" />
        </div>

        <div
          className="h-full w-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            WebkitMaskImage: 'url(#mask-path)',
            maskImage: 'url(#mask-path)'
          }}
        >
          <svg width="0" height="0" className="absolute">
            <defs>
              <mask id="mask-path" maskContentUnits="objectBoundingBox">
                <text
                  x="0.5"
                  y="0.91"
                  textAnchor="middle"
                  fontSize="1.2"
                  fontWeight="bold"
                  fill="white"
                  textLength="1"
                  lengthAdjust="spacingAndGlyphs"
                >
                  {code}
                </text>
              </mask>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export { ErrorPageTemplate }
