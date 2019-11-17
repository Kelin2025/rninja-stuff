import * as React from "react";
import { useStore } from "effector-react";

import { $ttsMessage } from "../logic";

export const TtsMessage = () => {
  const ttsMessage = useStore($ttsMessage);

  return ttsMessage;
};
