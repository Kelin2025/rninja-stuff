import { app } from "../../../server/core/app";
import { messageReceived } from "../../../server/core/tmi";
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
  console.log("check", text);
  for (const poll of polls) {
    console.log(poll);
    const idx = poll.answers.findIndex(answer => answer === text);
    console.log(idx);
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
  from: voteInPoll.done.map(({ params }) => ({
    options: { id: params.id, idx: params.idx }
  })),
  to: sendPollVoted
});

forward({
  from: stopPoll.done.map(({ params }) => ({ options: params })),
  to: sendPollStopped
});
