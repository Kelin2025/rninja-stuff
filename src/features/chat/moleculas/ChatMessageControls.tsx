import * as React from "react";

import { sendToQueuePressed } from "../logic";

import PlusIcon from "~ui/assets/icons/plus.svg";
import { Box, ClickableIcon } from "~ui";

export const ChatMessageControls = ({ data }) => {
  return (
    <Box flow="column">
      <ClickableIcon icon={PlusIcon} onClick={() => sendToQueuePressed(data)} />
    </Box>
  );
};
