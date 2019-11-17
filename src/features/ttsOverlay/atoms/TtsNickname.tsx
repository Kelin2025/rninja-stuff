import * as React from "react";
import { useStore } from "effector-react";

import { $ttsNickname } from "../logic";

export const TtsNickname = () => {
  const ttsNickname = useStore($ttsNickname);

  return (
    <>
      <b>{ttsNickname}</b> said
    </>
  );
};
