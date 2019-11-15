import { createEvent, forward } from "effector";

import { playTtsMessage, deleteTtsMessage, createTtsMessage } from "~api/tts";

export const playNowPressed = createEvent<{
  id: string;
}>();
export const backToQueuePressed = createEvent<{
  id: string;
  nickname: string;
  text: string;
}>();
export const removeFromHistoryPressed = createEvent<{
  id: string;
}>();

forward({
  from: playNowPressed.map(({ id }) => ({ params: { id } })),
  to: playTtsMessage
});

forward({
  from: backToQueuePressed.map(({ id }) => ({ params: { id } })),
  to: deleteTtsMessage
});

forward({
  from: backToQueuePressed.map(({ text, nickname }) => ({
    body: { text, nickname }
  })),
  to: createTtsMessage
});

forward({
  from: removeFromHistoryPressed.map(({ id }) => ({ params: { id } })),
  to: deleteTtsMessage
});
