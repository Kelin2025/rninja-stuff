import * as React from "react";
import { useList } from "effector-react";

import { $pollsHistory } from "~api/polls";

import { Box } from "~ui";
import { Poll } from "./Poll";

export const PollsHistory = ({ controls }) => {
  return (
    <Box flow="row" cols={["1fr"]}>
      {useList($pollsHistory, poll => (
        <Poll id={poll._id} controls={controls} />
      ))}
    </Box>
  );
};
