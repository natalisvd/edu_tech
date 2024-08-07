import { ReactNode, forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPlacement?: "start" | "end";
}

const baseStyle =
  "w-full p-2 font-normal text-sm placeholder-neutral border-b border-base-200 focus:outline-none focus:border-b-base-content transition-colors group-hover:border-b-base-content bg-transparent";

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ icon, iconPlacement = "start", ...inputProps }, forwardedRef) => {
    const addPadding = iconPlacement === "start" ? "ps-10" : "pe-10"; // Changed to ps-10 for 10px padding on the left
    const cn = icon ? baseStyle.concat(" ", addPadding) : baseStyle;

    return (
      <div className={`relative flex group justify-${iconPlacement}`}>
        {icon && iconPlacement === "start" && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            {icon}
          </span>
        )}
        <input {...inputProps} ref={forwardedRef} className={cn} />
        {icon && iconPlacement === "end" && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {icon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
