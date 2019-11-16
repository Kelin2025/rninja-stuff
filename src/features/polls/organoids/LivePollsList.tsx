import * as React from "react";
import { useList } from "effector-react";

import { $livePolls } from "~api/polls";

import { Box } from "~ui";
import { Poll } from "./Poll";

export const LivePollsList = ({ controls }) => {
  return (
    <Box flow="row" cols={["1fr"]}>
      {useList($livePolls, poll => (
        <Poll id={poll._id} controls={controls} />
      ))}
    </Box>
  );
};
