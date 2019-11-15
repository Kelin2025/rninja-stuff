import * as React from "react";

import { useTtsMessage } from "~api/tts";

import { MessageTemplate } from "~ui/templates/MessageTemplate";

export const TtsMessage = ({ id, controls }) => {
  const message = useTtsMessage(id);

  if (!message) {
    return null;
  }

  return (
    <MessageTemplate
      id={id}
      nickname={message.nickname}
      text={message.text}
      controls={controls}
    />
  );
};
