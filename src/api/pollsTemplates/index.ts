import { createStore } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { PollTemplate } from "./types";
import { createApiSender, socketOn } from "~lib/api";

export const getPollTemplates = createApiSender<void, PollTemplate[]>(
  "api/poll-templates",
  "GET"
);
export const createPollTemplate = createApiSender<
  Omit<PollTemplate, "_id">,
  PollTemplate
>("api/poll-templates", "POST");
export const updatePollTemplate = createApiSender<
  Omit<PollTemplate, "_id">,
  PollTemplate
>("api/poll-templates/:id", "PUT");
export const removePollTemplate = createApiSender<{ id: string }, null>(
  "api/poll-templates/:id",
  "DELETE"
);

export const pollTemplateCreated = socketOn<PollTemplate>(
  "polls-templates:created"
);
export const pollTemplateUpdated = socketOn<PollTemplate>(
  "polls-templates:updated"
);
export const pollTemplateRemoved = socketOn<PollTemplate>(
  "polls-templates:removed"
);

export const $pollsTemplates = createStore<PollTemplate[]>([]);

export const usePollTemplate = createUseListItem({
  store: $pollsTemplates,
  check: (id: string, pollTemplate) => pollTemplate._id === id
});

$pollsTemplates
  .on(getPollTemplates.done, (state, { result }) => result)
  .on(pollTemplateCreated, (state, pollTemplate) => [...state, pollTemplate])
  .on(pollTemplateUpdated, (state, pollTemplate) =>
    state.map(cur => (cur._id === pollTemplate._id ? pollTemplate : cur))
  )
  .on(pollTemplateRemoved, (state, pollTemplate) =>
    state.filter(cur => cur._id !== pollTemplate._id)
  );

getPollTemplates();
