import * as React from "react";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Authorized } from "~features/auth";
import { RouterView } from "~lib/routing/react";
import { RootTemplate } from "~ui";
import { PollsStartModal } from "~features/pollsStartModal";
import { PollTemplatesModal } from "~features/pollTemplatesModal";

export const Root = () => {
  return (
    <Authorized>
      <RootTemplate header={<Header />} sidebar={<Sidebar />}>
        <RouterView />
        <PollsStartModal />
        <PollTemplatesModal />
      </RootTemplate>
    </Authorized>
  );
};
