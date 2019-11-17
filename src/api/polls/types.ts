import { Duration } from "~lib/time-fns";

export type Poll = {
  _id: string;
  question: string;
  answers: string[];
  expiresAt: number;
  votes: number[];
  ended: boolean;
  duration: Duration;
};
