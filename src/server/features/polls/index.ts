import { app } from "../../../server/core/app";
import { intervalToSeconds } from "../../../lib/time-fns";

import {
  getPolls,
  stopPoll,
  createPoll,
  removePoll,
  voteInPoll,
  sendPollVoted,
  sendPollStopped,
  sendPollStarted,
  getActivePolls
} from "./actions";
import { forward } from "effector";
import { messageReceived } from "~server/core/tmi";

app.get("/api/polls", async (req, res) => {
  res.send(await getPolls(req.body));
});

app.post("/api/polls", async (req, res) => {
  res.send(await createPoll(req.body));
});

app.post("/api/polls/stop", async (req, res) => {
  res.send(await stopPoll(req.body));
});

app.delete("/api/polls/:id", async (req, res) => {
  res.send(await removePoll({ id: req.params.id }));
});

createPoll.done.watch(({ params, result }) => {
  setTimeout(() => {
    stopPoll({ id: result._id });
  }, intervalToSeconds(params.duration) * 1000);
});

messageReceived.watch(async ({ nickname, text }) => {
  const polls = await getActivePolls();
  for (const poll of polls) {
    const idx = poll.answers.findIndex(answer => answer === text);
    if (idx !== -1) {
      voteInPoll({ id: poll._id, voterId: nickname, idx });
    }
  }
});

forward({
  from: createPoll.done.map(({ result }) => ({ options: result })),
  to: sendPollStarted
});

forward({
  from: voteInPoll.done.map(({ params }) => ({ options: params })),
  to: sendPollVoted
});

forward({
  from: stopPoll.done.map(({ params }) => ({ options: params })),
  to: sendPollStopped
});
