import { createEvent } from "effector";

export const sendToQueuePressed = createEvent<{
  nickname: string;
  message: string;
}>();
