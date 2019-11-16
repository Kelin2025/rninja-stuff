import * as React from "react";
import { useList } from "effector-react";

import { $ttsHistory } from "~api/tts";

import { Box } from "~ui";
import { TtsMessage } from "./TtsMessage";

export const TtsHistoryList = ({ controls }) => {
  return (
    <Box flow="row" cols={["1fr"]}>
      {useList($ttsHistory, message => (
        <TtsMessage id={message._id} controls={controls} />
      ))}
    </Box>
  );
};
