import { PropsWithChildren } from "react";

export const FormCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="shadow-md dark:md:border border-base-200 px-5 py-6 sm:px-[70px] sm:py-[100px] rounded w-full max-w-[526px] bg-base-100">
      {children}
    </div>
  );
};
