import { forward, createEvent } from "effector";

import { Duration } from "~lib/time-fns";
import { stopPoll, createPoll } from "~api/polls";

export const stopPollPressed = createEvent<{
  _id: string;
}>();
export const restartPollPressed = createEvent<{
  question: string;
  answers: string[];
  duration: Duration;
}>();

forward({
  from: stopPollPressed.map(({ _id }) => ({ params: { id: _id } })),
  to: stopPoll
});

forward({
  from: restartPollPressed.map(body => ({ body })),
  to: createPoll
});
