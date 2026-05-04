import type { FormInputType } from './FormInput.types'

export const FormInput = ({ label, labelClassName, input, errorMessage }: FormInputType) => (
  <label className={`relative flex flex-col gap-[3px] ${labelClassName || ''}`}>
    <span className="text-xxs text-text-grey-dark">{label}</span>
    {input}
    {errorMessage && <span className="absolute top-[100%] text-xxs text-text-error">{errorMessage}</span>}
  </label>
)
