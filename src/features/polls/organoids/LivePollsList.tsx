import * as React from "react";
import { useStore } from "effector-react";

import { $livePolls } from "~api/polls";

import { Box } from "~ui";
import { Poll } from "./Poll";

export const LivePollsList = ({ controls }) => {
  const livePolls = useStore($livePolls);

  return (
    <Box flow="row" cols={["1fr"]}>
      {livePolls.map(poll => (
        <Poll id={poll._id} controls={controls} />
      ))}
    </Box>
  );
};
