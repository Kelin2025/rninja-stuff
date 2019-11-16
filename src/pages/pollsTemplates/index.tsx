import * as React from "react";
import { createEvent, forward } from "effector";

import { editPollTemplateModalOpened } from "~features/pollTemplatesModal/logic/controls";

import { Box, Button } from "~ui";
import { PollsTemplatesList } from "~features/pollsTemplates";

const createPressed = createEvent();

forward({
  from: createPressed.map(() => null),
  to: editPollTemplateModalOpened
});

export const PollsTemplatesPage = () => {
  return (
    <Box flow="row" cols={["1fr"]}>
      <Box flow="column">
        <Button type="save" onClick={createPressed}>
          Create New Template
        </Button>
      </Box>
      <PollsTemplatesList />
    </Box>
  );
};
