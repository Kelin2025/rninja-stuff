import * as React from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RouterView } from "~lib/routing/react";
import { RootTemplate } from "~ui";

export const Root = () => {
  return (
    <RootTemplate header={<Header />} sidebar={<Sidebar />}>
      <RouterView />
    </RootTemplate>
  );
};
