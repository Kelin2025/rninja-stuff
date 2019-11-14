import * as React from "react";
import { useStore } from "effector-react";

import { $chatMessagesList } from "~api/chat";

import { Box } from "~ui";
import { ChatMessage } from "./ChatMessage";

export const ChatMessagesList = ({ controls }) => {
  const chatMessagesList = useStore($chatMessagesList);

  return (
    <Box flow="row" cols={["1fr"]}>
      {chatMessagesList.map(poll => (
        <ChatMessage id={poll._id} controls={controls} />
      ))}
    </Box>
  );
};
