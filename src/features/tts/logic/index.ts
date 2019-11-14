import { createEvent } from "effector";

export const playNowPressed = createEvent<{
  _id: string;
}>();
export const backToQueuePressed = createEvent<{
  nickname: string;
  message: string;
}>();

export const removeFromHistoryPressed = createEvent<{
  _id: string;
}>();
