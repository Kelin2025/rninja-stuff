import * as React from "react";

import { playNowPressed, removeFromHistoryPressed } from "../logic";

import PlusIcon from "~ui/assets/icons/plus.svg";
import TrashIcon from "~ui/assets/icons/trash.svg";
import { Box, ClickableIcon } from "~ui";

export const TtsLiveControls = ({ data }) => {
  return (
    <Box flow="column">
      <ClickableIcon icon={PlusIcon} onClick={() => playNowPressed(data)} />
      <ClickableIcon
        icon={TrashIcon}
        onClick={() => removeFromHistoryPressed(data)}
      />
    </Box>
  );
};
