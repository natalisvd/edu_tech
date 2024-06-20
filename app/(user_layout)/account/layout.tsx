import Link from "next/link.js";
import type { ReactNode } from "react";

import { Tab, TabList, TabPanel, Tabs } from "./tabs";

export default function Layout(props: { tabs: ReactNode }) {
  return (
    <main className="main">
      <div className="wrapper">
        <Tabs>
          <TabList>
            <Tab href="/account">Settings</Tab>
            <Tab href="/account/team">Team</Tab>
          </TabList>
          <TabPanel>{props.tabs}</TabPanel>
        </Tabs>
      </div>
    </main>
  );
}
