import { createEvent } from "effector";

export const stopPollPressed = createEvent<{
  _id: string;
}>();
export const restartPollPressed = createEvent<{
  question: string;
  answers: string[];
}>();
