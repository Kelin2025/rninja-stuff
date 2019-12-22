import { createStore } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { Poll } from "./types";
import { Duration } from "~lib/time-fns";
import { socketOn, createApiSender } from "~lib/api";

export const pollStarted = socketOn<Poll>("poll:started");
export const pollVoted = socketOn<{ id: string; idx: number }>("poll:voted");
export const pollStopped = socketOn<{ id: string }>("poll:stopped");

export const createPoll = createApiSender<
  { question: string; answers: string[]; duration: Duration },
  {}
>("api/polls", "POST");
export const getPolls = createApiSender<{}, Poll[]>("api/polls", "GET");
export const stopPoll = createApiSender<{}, Poll[]>(
  "api/polls/:id/stop",
  "POST"
);
export const removePoll = createApiSender<{}, {}>("api/polls/:id", "DELETE");

export const $pollsList = createStore<Poll[]>([]);

export const $livePolls = $pollsList.map(list =>
  list.filter(poll => !poll.ended)
);
export const $pollsHistory = $pollsList.map(list =>
  list.filter(poll => poll.ended)
);

export const $livePoll = createStore(null);
export const $hasLivePoll = $livePoll.map(poll => !!poll && !poll.ended);

export const usePoll = createUseListItem({
  store: $pollsList,
  check: (id: string, poll) => poll._id === id
});

$pollsList
  .on(pollStarted, (state, poll) => [poll, ...state])
  .on(pollStopped, (state, { id }) =>
    state.map(cur => (cur._id === id ? { ...cur, ended: true } : cur))
  )
  .on(pollVoted, (state, { id, idx }) =>
    state.map(cur =>
      cur._id === id ? { ...cur, votes: [...cur.votes, idx] } : cur
    )
  )
  .on(getPolls.done, (state, { result }) => result);

$livePoll
  .on(pollStarted, (state, poll) => poll)
  .on(
    getPolls.done,
    (state, { result }) => result.find(poll => !poll.ended) || null
  )
  .on(pollVoted, (state, { id, idx }) =>
    state && state._id === id
      ? { ...state, votes: [...state.votes, idx] }
      : state
  )
  .on(pollStopped, state => ({ ...state, ended: true }));

getPolls();
