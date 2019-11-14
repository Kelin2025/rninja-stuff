import * as React from "react";
import { useStore } from "effector-react";

import { $ttsHistory } from "~api/tts";

import { Box } from "~ui";
import { TtsMessage } from "./TtsMessage";

export const TtsHistoryList = ({ controls }) => {
  const ttsHistory = useStore($ttsHistory);

  return (
    <Box flow="row" cols={["1fr"]}>
      {ttsHistory.map(message => (
        <TtsMessage id={message._id} controls={controls} />
      ))}
    </Box>
  );
};
