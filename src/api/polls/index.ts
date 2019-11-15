import { createStore, combine } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { Poll } from "./types";
import { $now } from "~lib/time-fns";
import { socketOn, createApiSender } from "~lib/api";

export const pollStarted = socketOn<Poll>("poll:started");
export const pollStopped = socketOn<Poll>("poll:stopped");

export const createPoll = createApiSender<
  { question: string; answers: string[] },
  {}
>("/api/polls", "POST");
export const removePoll = createApiSender<{}, {}>("/api/polls/:id", "DELETE");

export const $pollsList = createStore<Poll[]>([]);

export const $livePolls = combine($now, $pollsList, (now, list) =>
  list.filter(poll => !poll.ended)
);
export const $pollsHistory = combine($now, $pollsList, (now, list) =>
  list.filter(poll => poll.ended)
);

export const usePoll = createUseListItem({
  store: $pollsList,
  check: (id: string, poll) => poll._id === id
});

$pollsList
  .on(pollStarted, (state, poll) => [poll, ...state])
  .on(pollStopped, (state, { _id }) =>
    state.map(cur => (cur._id === _id ? { ...cur, ended: true } : cur))
  );
