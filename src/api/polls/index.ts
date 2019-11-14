import { createStore, combine } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { Poll } from "./types";
import { $now } from "~lib/time-fns";

export const $pollsList = createStore<Poll[]>([
  {
    _id: "test",
    question: "Helo",
    answers: ["aa", "bb", "cc"],
    votes: [0, 1, 2, 2],
    expiresAt: +Date.now() + 1000 * 60
  },
  {
    _id: "test2",
    question: "Heloff",
    answers: ["aa", "bb", "cc"],
    votes: [0, 1, 2, 2],
    expiresAt: +Date.now() - 1000 * 60
  },
  {
    _id: "test3",
    question: "Heloaa",
    answers: ["aa", "bb", "cc"],
    votes: [0, 1, 2, 2],
    expiresAt: +Date.now() - 1000 * 60
  }
]);

export const $livePolls = combine($now, $pollsList, (now, list) =>
  list.filter(poll => poll.expiresAt > +now)
);
export const $pollsHistory = combine($now, $pollsList, (now, list) =>
  list.filter(poll => poll.expiresAt < +now)
);

export const usePoll = createUseListItem({
  store: $pollsList,
  check: (id: string, poll) => poll._id === id
});
