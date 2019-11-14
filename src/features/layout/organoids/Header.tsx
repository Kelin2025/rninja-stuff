import * as React from "react";

import { Box, HeaderTemplate } from "~ui";

export const Header = () => (
  <HeaderTemplate>
    <Box flow="column" justify="space-between">
      <h2>Dashboard</h2>
    </Box>
  </HeaderTemplate>
);
