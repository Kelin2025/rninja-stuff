import * as React from "react";

import { Box } from "~ui";
import { ChatMessagesList, ChatMessageControls } from "~features/chat";
import {
  TtsQueueList,
  TtsHistoryList,
  TtsLiveControls,
  TtsHistoryControls
} from "~features/tts";

export const TtsPage = () => {
  return (
    <Box flow="column" cols={["1fr", "1fr", "1fr"]} align="start">
      <Box cols={["1fr"]}>
        <h2>Chat Messages</h2>
        <ChatMessagesList controls={ChatMessageControls} />
      </Box>
      <Box cols={["1fr"]}>
        <Box flow="column" justify="space-between">
          <h2>TTS Queue</h2>
        </Box>
        <TtsQueueList controls={TtsLiveControls} />
      </Box>
      <Box cols={["1fr"]}>
        <h2>TTS History</h2>
        <TtsHistoryList controls={TtsHistoryControls} />
      </Box>
    </Box>
  );
};
