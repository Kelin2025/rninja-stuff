import * as React from "react";

import { usePollTemplate } from "~api/pollsTemplates";
import {
  startPollPressed,
  editPollTemplatePressed,
  removePollTemplatePressed
} from "../logic";

import TrashIcon from "~ui/assets/icons/trash.svg";
import { Box, Card, Button } from "~ui";

export const PollTemplate = ({ id }) => {
  const poll = usePollTemplate(id);

  return (
    <Card>
      <h2>{poll.question}</h2>
      <Box flow="row" cols={["1fr"]}>
        <Box flow="row">
          {poll.answers.map(answer => (
            <div>{answer}</div>
          ))}
        </Box>
        <Box flow="column">
          <Button type="save" onClick={() => startPollPressed(poll)}>
            Start Poll
          </Button>
          <Button onClick={() => editPollTemplatePressed(poll)}>
            Edit Poll
          </Button>
          <Button type="cancel" onClick={() => removePollTemplatePressed(poll)}>
            <TrashIcon />
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
