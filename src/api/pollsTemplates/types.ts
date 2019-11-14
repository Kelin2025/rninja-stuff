import { Duration } from "~lib/time-fns";

export type PollTemplate = {
  _id: string;
  question: string;
  answers: string[];
  duration: Duration;
};
