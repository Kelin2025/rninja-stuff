import { sample, forward, createEvent } from "effector";

import { modal } from "~ui/logic/modals";
import { createPoll } from "~api/polls";
import { $question, $answers, $duration, $formData } from "./form";

export const pollsStartModalOpened = createEvent<void>();
export const savePressed = createEvent<void>();
export const cancelPressed = createEvent<void>();

$question.on(pollsStartModalOpened, () => "");

$answers.on(pollsStartModalOpened, () => [""]);

$duration.on(pollsStartModalOpened, () => ({ type: "minutes", value: 1 }));

forward({
  from: sample($formData, savePressed, body => ({ body })),
  to: createPoll
});

modal("pollsStart")
  .openOn(pollsStartModalOpened)
  .closeOn(savePressed)
  .closeOn(cancelPressed);
