"use client";
import { useUser } from "@/app/hooks/auth.hook";
import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import Link from "next/link.js";
import { usePathname, useRouter } from "next/navigation.js";
import * as React from "react";

export function Tabs(props: Ariakit.TabProviderProps) {
  const router = useRouter();
  const selectedId = usePathname();
  useUser();

  return (
    <Ariakit.TabProvider
      selectedId={selectedId}
      setSelectedId={(id) => router.push(id || selectedId)}
      {...props}
    />
  );
}

export const TabList = React.forwardRef<HTMLDivElement, Ariakit.TabListProps>(
  function TabList(props, ref) {
    return (
      <Ariakit.TabList
        ref={ref}
        {...props}
        className={clsx("tab-list flex space-x-4 border-b w-[710px]", props.className)}
      />
    );
  }
);

export const Tab = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(function Tab(props, ref) {
  const id = props.href.toString();
  const selectedId = usePathname();
  const isActive = selectedId === id;

  return (
    <Ariakit.Tab
      id={id}
      className={clsx(
        "tab px-4 py-2 border-b-2 transition-colors",
        isActive
          ? "border-blue-500 text-blue-500"
          : "border-transparent text-gray-500 hover:text-blue-500"
      )}
      render={<Link ref={ref} {...props} />}
    />
  );
});

export const TabPanel = React.forwardRef<HTMLDivElement, Ariakit.TabPanelProps>(
  function TabPanel(props, ref) {
    const tab = Ariakit.useTabContext();
    if (!tab) throw new Error("TabPanel must be wrapped in a Tabs component");

    const tabId = tab.useState("selectedId");

    return (
      <Ariakit.TabPanel
        ref={ref}
        tabId={tabId}
        {...props}
        className={clsx("tab-panel p-4", props.className)}
      />
    );
  }
);
