import { forwardRef } from "react";

export const FileInput = forwardRef<
  HTMLInputElement,
  { id: string; icon?: boolean }
>(({ id, icon = false, ...inputProps }, forwardedRef) => {
  return (
    <>
      <input type="file" id={id} hidden ref={forwardedRef} {...inputProps} />
      {icon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      )}
    </>
  );
});

FileInput.displayName = "FileInput";
