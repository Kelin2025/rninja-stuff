import { app } from "~server/core/app";
import { intervalToSeconds } from "~lib/time-fns";

import {
  stopPoll,
  createPoll,
  removePoll,
  voteInPoll,
  sendPollVoted,
  sendPollStopped,
  sendPollStarted
} from "./actions";
import { forward } from "effector";

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

forward({
  from: createPoll.done.map(({ params }) => params),
  to: sendPollStarted
});

forward({
  from: voteInPoll.done.map(({ params }) => params),
  to: sendPollVoted
});

forward({
  from: stopPoll.done.map(({ params }) => params),
  to: sendPollStopped
});
