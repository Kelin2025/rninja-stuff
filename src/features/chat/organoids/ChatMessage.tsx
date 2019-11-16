import * as React from "react";

import { useChatMessage } from "~api/chat";

import { MessageTemplate } from "~ui/templates/MessageTemplate";
import { useIsRendered } from "~lib/highlight-render-hook";

export const ChatMessage = ({ id, controls }) => {
  const message = useChatMessage(id);
  const isRendered = useIsRendered.memo(`chat${id}`, 300);

  if (!message) {
    return null;
  }

  return (
    <MessageTemplate
      isHighlighted={isRendered}
      nickname={message.nickname}
      text={message.text}
      controls={controls}
    />
  );
};
