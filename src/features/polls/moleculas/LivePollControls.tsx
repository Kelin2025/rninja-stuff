import * as React from "react";

import { stopPollPressed } from "../logic";

import { Box, Button } from "~ui";

export const LivePollControls = ({ data }) => {
  return (
    <Box flow="column">
      <Button type="cancel" onClick={() => stopPollPressed(data)}>
        Stop Now
      </Button>
    </Box>
  );
};
