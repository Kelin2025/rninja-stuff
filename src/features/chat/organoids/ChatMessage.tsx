import * as React from "react";

import { useChatMessage } from "~api/chat";

import { MessageTemplate } from "~ui/templates/MessageTemplate";

export const ChatMessage = ({ id, controls }) => {
  const message = useChatMessage(id);

  return (
    <MessageTemplate
      nickname={message.nickname}
      text={message.text}
      controls={controls}
    />
  );
};
