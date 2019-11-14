import * as React from "react";

import { useTtsMessage } from "~api/tts";

import { MessageTemplate } from "~ui/templates/MessageTemplate";

export const TtsMessage = ({ id, controls }) => {
  const message = useTtsMessage(id);

  return (
    <MessageTemplate
      nickname={message.nickname}
      text={message.text}
      controls={controls}
    />
  );
};
