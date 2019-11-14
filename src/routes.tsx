import * as React from "react";
import { initDomRouter } from "~lib/routing/dom";

import { TtsPage } from "~pages/tts";
import { PollsPage } from "~pages/polls";

const routes = {
  home: {
    view: () => <PollsPage />,
    meta: {
      path: "/"
    }
  },
  tts: {
    view: () => <TtsPage />,
    meta: {
      path: "/"
    }
  }
};

let initialRoute = { name: "home" };

initDomRouter({
  routes,
  initialRoute
});
