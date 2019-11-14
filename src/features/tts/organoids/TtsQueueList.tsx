import * as React from "react";
import { useStore } from "effector-react";

import { $ttsQueue } from "~api/tts";

import { Box } from "~ui";
import { TtsMessage } from "./TtsMessage";

export const TtsQueueList = ({ controls }) => {
  const ttsQueue = useStore($ttsQueue);

  return (
    <Box flow="row" cols={["1fr"]}>
      {ttsQueue.map(message => (
        <TtsMessage id={message._id} controls={controls} />
      ))}
    </Box>
  );
};
