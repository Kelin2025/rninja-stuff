import * as React from "react";
import styled from "styled-components";
import { combine } from "effector";
import { useStore } from "effector-react";
import { intervalToSeconds } from "~lib/time-fns";

import { $livePoll } from "~api/polls";

import clockImage from "~ui/assets/images/clock.png";
import { Box, Countdown } from "~ui";

const Time = styled.span`
  font-size: 40px;
  font-weight: 900;
`;

const $duration = $livePoll.map(poll => (poll && poll.duration) || 0);
const $expiresAt = $livePoll.map(poll => (poll && poll.expiresAt) || 0);
const $createdAt = combine(
  $duration,
  $expiresAt,
  (duration, expiresAt) => expiresAt - intervalToSeconds(duration) * 1000
);

$livePoll.watch(console.log);

export const PollTimer = () => {
  const duration = useStore($duration);
  const createdAt = useStore($createdAt);

  console.log(duration, createdAt, new Date(createdAt));

  return (
    <Box flow="column">
      <img src={clockImage} />
      <Time>
        <Countdown format="{M}:{S}" startDate={createdAt} duration={duration} />
      </Time>
    </Box>
  );
};
