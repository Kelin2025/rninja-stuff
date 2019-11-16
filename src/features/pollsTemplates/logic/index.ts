import { createEvent, forward } from "effector";

import { goTo } from "~lib/routing";
import { createPoll } from "~api/polls";
import { PollTemplate } from "~api/pollsTemplates/types";
import { removePollTemplate } from "~api/pollsTemplates";
import { editPollTemplateModalOpened } from "~features/pollTemplatesModal/logic/controls";

export const startPollPressed = createEvent<PollTemplate>();
export const editPollTemplatePressed = createEvent<PollTemplate>();
export const removePollTemplatePressed = createEvent<PollTemplate>();

forward({
  from: startPollPressed.map(poll => ({ body: poll })),
  to: createPoll
});

forward({
  from: startPollPressed.map(() => ({ name: "home" })),
  to: goTo
});

forward({
  from: editPollTemplatePressed,
  to: editPollTemplateModalOpened
});

forward({
  from: removePollTemplatePressed.map(({ _id }) => ({ params: { id: _id } })),
  to: removePollTemplate
});
