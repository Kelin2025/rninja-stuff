import { createStore } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { PollTemplate } from "./types";

export const $pollsTemplates = createStore<PollTemplate[]>([
  {
    _id: "test",
    question: "Hello there",
    answers: ["aa", "bb", "Norman Ridus"],
    duration: { type: "seconds", value: 30 }
  }
]);

export const usePollTemplate = createUseListItem({
  store: $pollsTemplates,
  check: (id: string, pollTemplate) => pollTemplate._id === id
});
