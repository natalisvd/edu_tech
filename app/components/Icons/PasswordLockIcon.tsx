import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 488.8 488.8"
    {...props}
  >
    <path d="M81.5 488.8h325.8c19.7 0 35.8-16.1 35.8-35.8V258.3c0-19.7-16.1-35.8-35.8-35.8h-25.2v-84.8C382.1 61.8 320.3 0 244.4 0S106.7 61.8 106.7 137.7v84.8H81.5c-19.7 0-35.8 16.1-35.8 35.8V453c0 19.7 16.1 35.8 35.8 35.8zm49.7-351.1c0-62.4 50.8-113.2 113.2-113.2s113.2 50.8 113.2 113.2v84.8H131.2v-84.8zm-61 120.6c0-6.2 5.1-11.3 11.3-11.3h325.8c6.2 0 11.3 5.1 11.3 11.3V453c0 6.2-5.1 11.3-11.3 11.3H81.5c-6.2 0-11.3-5.1-11.3-11.3V258.3z" />
    <path d="M244.4 405.5c27.5 0 49.9-22.4 49.9-49.9s-22.4-49.9-49.9-49.9-49.9 22.4-49.9 49.9c0 27.6 22.4 49.9 49.9 49.9zm0-75.2c14 0 25.4 11.4 25.4 25.4s-11.4 25.4-25.4 25.4c-14 0-25.4-11.4-25.4-25.4s11.4-25.4 25.4-25.4z" />
  </svg>
);
export { SvgComponent as PasswordLockIcon };