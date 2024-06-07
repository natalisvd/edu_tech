import { ReactNode, forwardRef } from "react"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode,
  iconPlacement?: 'start' | 'end'
}

const baseStyle = "w-full p-2 font-normal text-sm placeholder-neutral border-b border-base-200 focus:outline-none focus:border-b-base-content transition-colors group-hover:border-b-base-content bg-transparent"

export const Input = forwardRef<HTMLInputElement, TextInputProps>(({ icon, iconPlacement = 'start', ...inputProps }, forwardedRef) => {
  const addPadding = iconPlacement === 'start' ? 'ps-7' : 'pe-7'
  const cn = icon ? baseStyle.concat(' ', addPadding) : baseStyle

  return (
    <div className={`relative flex group justify-${iconPlacement}`}>
      {icon}
      <input
        {...inputProps}
        ref={forwardedRef}
        className={cn}
        />
    </div>
  )
})
