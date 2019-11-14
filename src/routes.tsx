import * as React from "react";
import { initDomRouter } from "~lib/routing/dom";

import { TtsPage } from "~pages/tts";
import { PollsPage } from "~pages/polls";
import { PollsTemplatesPage } from "~pages/pollsTemplates";

const routes = {
  home: {
    view: () => <PollsPage />,
    meta: {
      path: "/"
    }
  },
  pollsTemplates: {
    view: () => <PollsTemplatesPage />,
    meta: {
      path: "/polls/templates"
    }
  },
  tts: {
    view: () => <TtsPage />,
    meta: {
      path: "/tts"
    }
  }
};

let initialRoute = { name: "home" };

initDomRouter({
  routes,
  initialRoute
});
