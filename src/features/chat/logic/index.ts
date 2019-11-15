import { createEvent, forward } from "effector";

import { createTtsMessage } from "~api/tts";

export const sendToQueuePressed = createEvent<{
  nickname: string;
  text: string;
}>();

forward({
  from: sendToQueuePressed.map(body => ({ body })),
  to: createTtsMessage
});
