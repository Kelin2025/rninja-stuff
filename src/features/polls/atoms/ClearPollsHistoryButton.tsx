import * as React from "react";

import { clearPressed } from "../logic";

import { Button } from "~ui";

export const ClearPollsHistoryButton = () => {
  return <Button onClick={clearPressed}>Clear History</Button>;
};
