import * as React from "react";
import { useStore } from "effector-react";

import { $ttsVolume } from "~api/tts";

export const TtsVolume = () => {
  const ttsVolume = useStore($ttsVolume);

  return <input value={ttsVolume} onChange={console.log} />;
};
