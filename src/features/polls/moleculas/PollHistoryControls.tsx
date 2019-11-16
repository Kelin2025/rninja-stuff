import * as React from "react";

import { restartPollPressed } from "../logic";

import { Box, Button } from "~ui";

export const PollHistoryControls = ({ data }) => {
  return (
    <Box flow="column">
      <Button type="save" onClick={() => restartPollPressed(data)}>
        Start Again
      </Button>
    </Box>
  );
};
