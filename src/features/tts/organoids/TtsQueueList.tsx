import * as React from "react";
import { useStore, useList } from "effector-react";

import { $ttsQueue } from "~api/tts";

import { Box } from "~ui";
import { TtsMessage } from "./TtsMessage";

export const TtsQueueList = ({ controls }) => {
  return (
    <Box flow="row" cols={["1fr"]}>
      {useList($ttsQueue, message => (
        <TtsMessage id={message._id} controls={controls} />
      ))}
    </Box>
  );
};
