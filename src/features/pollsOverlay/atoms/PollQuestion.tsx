import * as React from "react";
import { useStore } from "effector-react";

import { $livePoll } from "~api/polls";

const $question = $livePoll.map(poll => (poll && poll.question) || "");

export const PollQuestion = () => {
  const question = useStore($question);

  return question;
};
