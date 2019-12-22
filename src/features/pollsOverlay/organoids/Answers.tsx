import * as React from "react";
import { combine } from "effector";
import { useList } from "effector-react";

import { $livePoll } from "~api/polls";

import userImage from "~ui/assets/images/user.png";
import { OverlayCard } from "~ui";

const $answers = $livePoll.map(poll => (poll && poll.answers) || []);
const $votes = $livePoll.map(
  poll =>
    poll &&
    poll.answers.map((cur, idx) => poll.votes.filter(val => val === idx).length)
);
const $obj = combine($answers, $votes, (answers, votes) =>
  answers.map((answer, idx) => ({ answer, votes: votes[idx] }))
);

$livePoll.watch(console.log);

export const Answers = () => {
  return useList($obj, ({ answer, votes }) => (
    <OverlayCard title={<b>{answer}</b>}>
      <img src={userImage} style={{ verticalAlign: "-2px" }} /> <b>{votes}</b>{" "}
      votes
    </OverlayCard>
  ));
};
