import * as React from "react";

import { restartPollPressed } from "../logic";

import { Box } from "~ui";

export const PollHistoryControls = ({ data }) => {
  return (
    <Box flow="column">
      <button onClick={() => restartPollPressed(data)}>Start Again</button>
    </Box>
  );
};
