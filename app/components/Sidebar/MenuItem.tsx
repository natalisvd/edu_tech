'use client'

import { Url } from "next/dist/shared/lib/router/router";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export const MenuItem = ({ children, href, ...props }: PropsWithChildren<{ href: Url, props?: LinkProps }>) => {
  const onClick = () => {
    const drawer = document.getElementById("left-sidebar-menu")
    drawer?.click()
  }

  return (
    <li>
      <Link href={href} {...props} onClick={onClick}>{children}</Link>
    </li>
  )
}