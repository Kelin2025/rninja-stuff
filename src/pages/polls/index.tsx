import * as React from "react";
import { useStore } from "effector-react";
import { forward, createEvent } from "effector";

import { $livePolls } from "~api/polls";
import { pollsStartModalOpened } from "~features/pollsStartModal/logic/controls";

import { Box, Button } from "~ui";
import {
  PollsHistory,
  LivePollsList,
  LivePollControls,
  PollHistoryControls,
  ClearPollsHistoryButton
} from "~features/polls";

const createPressed = createEvent();

const $hasLivePolls = $livePolls.map(polls => !!polls.length);

forward({
  from: createPressed,
  to: pollsStartModalOpened
});

const LiveSection = () => {
  const hasLivePolls = useStore($hasLivePolls);

  if (hasLivePolls) {
    return <LivePollsList controls={LivePollControls} />;
  }

  return (
    <Box>
      <Button onClick={createPressed}>Create Poll</Button>
    </Box>
  );
};

export const PollsPage = () => {
  return (
    <Box flow="column" cols={["1fr", "1fr"]} align="start">
      <Box flow="row" cols={["1fr"]}>
        <h2>Current Poll</h2>
        <LiveSection />
      </Box>
      <Box flow="row" cols={["1fr"]}>
        <Box flow="column" justify="space-between">
          <h2>History</h2>
          <ClearPollsHistoryButton />
        </Box>
        <PollsHistory controls={PollHistoryControls} />
      </Box>
    </Box>
  );
};
