import * as React from "react";

import { stopPollPressed } from "../logic";

import { Box } from "~ui";

export const LivePollControls = ({ data }) => {
  return (
    <Box flow="column">
      <button onClick={() => stopPollPressed(data)}>Stop Now</button>
    </Box>
  );
};
