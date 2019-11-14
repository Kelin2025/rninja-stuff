import * as React from "react";

import { Box } from "~ui";
import { PollsTemplatesList } from "~features/pollsTemplates";

export const PollsTemplatesPage = () => {
  return (
    <Box flow="row" cols={["1fr"]}>
      <PollsTemplatesList />
    </Box>
  );
};
