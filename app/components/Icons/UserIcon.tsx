import * as React from "react";
import { SVGProps } from "react";
const SvgComponent =(props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="currentColor"
    {...props}
  >
    <path d="M5.25 6a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM9 8.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM4.757 12.257A6 6 0 0 0 3 16.5h1.5a4.5 4.5 0 1 1 9 0H15a6 6 0 0 0-10.243-4.243Z" />
  </svg>
);
export { SvgComponent as UserIcon };
