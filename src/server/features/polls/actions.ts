import { createEffect } from "effector";
import { intervalToSeconds } from "../../../lib/time-fns";

import { PollModel } from "./model";
import { createSocketSender } from "../../core/socket";

export const sendPollVoted = createSocketSender("poll:voted");
export const sendPollStarted = createSocketSender("poll:started");
export const sendPollStopped = createSocketSender("poll:stopped");
export const sendPollsCleared = createSocketSender("polls:cleared");

export const getPolls = createEffect({
  handler: () => {
    return PollModel.find({})
      .sort({ createdAt: -1 })
      .exec();
  }
});

export const getActivePolls = createEffect({
  handler: () => {
    return PollModel.find({ ended: false })
      .sort({ createdAt: -1 })
      .exec();
  }
});

export const getPollById = createEffect({
  handler: ({ id }) => {
    return PollModel.findOne({ _id: id }).exec();
  }
});

export const createPoll = createEffect({
  handler: ({ question, answers, duration }) => {
    const poll = new PollModel();
    const ms = intervalToSeconds(duration) * 1000;
    poll.question = question;
    poll.answers = answers;
    poll.votes = [];
    poll.voters = [];
    poll.duration = duration;
    poll.expiresAt = +new Date() + ms;
    poll.ended = false;
    return poll.save();
  }
});

export const removePoll = createEffect({
  handler: ({ id }) => {
    return PollModel.findOneAndRemove({ _id: id });
  }
});

export const voteInPoll = createEffect({
  handler: async ({ id, voterId, idx }) => {
    const poll = await getPollById({ id });
    if (!poll) {
      throw new Error("NO_POLL");
    }
    if (poll.answers.length <= idx) {
      throw new Error("NO_ANSWER");
    }
    if (poll.ended) {
      throw new Error("POLL_EXPIRED");
    }
    if (poll.voters.includes(voterId)) {
      throw new Error("ALREADY_VOTED");
    }
    poll.votes.push(idx);
    poll.voters.push(voterId);
    return poll.save();
  }
});

export const stopPoll = createEffect({
  handler: async ({ id }) => {
    const poll = await getPollById({ id });
    if (!poll) {
      throw new Error("NO_POLL");
    }
    poll.ended = true;
    return poll.save();
  }
});

export const clearPolls = createEffect({
  handler: async () => {
    return PollModel.remove({});
  }
});
