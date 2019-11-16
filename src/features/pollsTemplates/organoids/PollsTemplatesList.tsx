import * as React from "react";
import { useStore } from "effector-react";

import { $pollsTemplates } from "~api/pollsTemplates";

import { Box } from "~ui";
import { PollTemplate } from "./PollTemplate";

export const PollsTemplatesList = () => {
  const pollsTemplates = useStore($pollsTemplates);

  return (
    <Box flow="row" cols={["1fr"]}>
      {pollsTemplates.map(pollTemplate => (
        <PollTemplate id={pollTemplate._id} />
      ))}
    </Box>
  );
};
