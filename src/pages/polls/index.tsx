import * as React from "react";

import { Box } from "~ui";
import {
  PollsHistory,
  LivePollsList,
  LivePollControls,
  PollHistoryControls
} from "~features/polls";

export const PollsPage = () => {
  return (
    <Box flow="column" cols={["1fr", "1fr"]} align="start">
      <Box flow="row" cols={["1fr"]}>
        <h2>Live Poll</h2>
        <LivePollsList controls={LivePollControls} />
      </Box>
      <Box flow="row" cols={["1fr"]}>
        <h2>History</h2>
        <PollsHistory controls={PollHistoryControls} />
      </Box>
    </Box>
  );
};
