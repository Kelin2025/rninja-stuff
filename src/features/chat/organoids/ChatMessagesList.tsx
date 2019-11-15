import * as React from "react";
import { useStore, useList } from "effector-react";

import { $chatMessagesList } from "~api/chat";

import { Box } from "~ui";
import { ChatMessage } from "./ChatMessage";

export const ChatMessagesList = ({ controls }) => {
  return (
    <Box flow="row" cols={["1fr"]}>
      {useList($chatMessagesList, poll => (
        <ChatMessage id={poll._id} controls={controls} />
      ))}
    </Box>
  );
};
