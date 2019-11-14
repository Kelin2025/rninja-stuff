import * as React from "react";

import { playNowPressed } from "../logic";

import PlusIcon from "~ui/assets/icons/plus.svg";
import { Box, ClickableIcon } from "~ui";

export const TtsLiveControls = ({ data }) => {
  return (
    <Box flow="column">
      <ClickableIcon icon={PlusIcon} onClick={() => playNowPressed(data)} />
    </Box>
  );
};
