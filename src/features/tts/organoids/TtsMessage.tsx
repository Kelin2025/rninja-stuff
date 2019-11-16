import * as React from "react";

import { useTtsMessage } from "~api/tts";
import { useIsRendered } from "~lib/highlight-render-hook";

import { MessageTemplate } from "~ui/templates/MessageTemplate";

export const TtsMessage = ({ id, controls }) => {
  const message = useTtsMessage(id);
  const isRendered = useIsRendered.memo(
    `tts${id}${message && message.played ? "played" : ""}`,
    300
  );

  if (!message) {
    return null;
  }

  return (
    <MessageTemplate
      id={id}
      nickname={message.nickname}
      text={message.text}
      controls={controls}
      isHighlighted={isRendered}
    />
  );
};
