import { createEffect } from "effector";

import { PollTemplateModel } from "./model";

export const getPollTemplates = createEffect({
  handler: () => {
    return PollTemplateModel.find({}).exec();
  }
});

export const getPollTemplateById = createEffect({
  handler: ({ id }) => {
    return PollTemplateModel.findOne({ _id: id }).exec();
  }
});

export const createPollTemplate = createEffect({
  handler: ({ question, answers, duration }) => {
    const poll = new PollTemplateModel();
    poll.question = question;
    poll.answers = answers;
    poll.duration = duration;
    return poll.save();
  }
});

export const updatePollTemplate = createEffect({
  handler: async ({ id, question, answers, duration }) => {
    const poll = await getPollTemplateById({ id });
    poll.question = question;
    poll.answers = answers;
    poll.duration = duration;
    return poll.save();
  }
});

export const removePollTemplate = createEffect({
  handler: ({ id }) => {
    return PollTemplateModel.findOneAndRemove({ _id: id });
  }
});
