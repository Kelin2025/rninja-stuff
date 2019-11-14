import * as React from "react";
import { useStore } from "effector-react";

import { $pollsHistory } from "~api/polls";

import { Box } from "~ui";
import { Poll } from "./Poll";

export const PollsHistory = ({ controls }) => {
  const pollsHistory = useStore($pollsHistory);

  return (
    <Box flow="row" cols={["1fr"]}>
      {pollsHistory.map(poll => (
        <Poll id={poll._id} controls={controls} />
      ))}
    </Box>
  );
};
