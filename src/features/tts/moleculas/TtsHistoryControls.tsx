import * as React from "react";

import { backToQueuePressed, removeFromHistoryPressed } from "../logic";

import PlusIcon from "~ui/assets/icons/plus.svg";
import TrashIcon from "~ui/assets/icons/trash.svg";
import { Box, ClickableIcon } from "~ui";

export const TtsHistoryControls = ({ data }) => {
  return (
    <Box flow="column">
      <ClickableIcon icon={PlusIcon} onClick={() => backToQueuePressed(data)} />
      <ClickableIcon
        icon={TrashIcon}
        onClick={() => removeFromHistoryPressed(data)}
      />
    </Box>
  );
};
