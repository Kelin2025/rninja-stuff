import * as React from "react";

import { Box, HeaderTemplate, Countdown } from "~ui";

const Timer = () => {
  return (
    <Countdown
      startDate={new Date()}
      format="{m} min"
      duration={{ type: "minutes", value: 20 }}
    />
  );
};

export const Header = () => (
  <HeaderTemplate>
    <Box flow="column" justify="space-between">
      <h2>Dashboard</h2>
      <div>
        The page will refresh automatically in{" "}
        <b>
          <Timer />
        </b>
      </div>
    </Box>
  </HeaderTemplate>
);
