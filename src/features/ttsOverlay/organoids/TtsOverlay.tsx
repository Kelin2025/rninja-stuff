import * as React from "react";
import styled, { css } from "styled-components";
import { useStore } from "effector-react";

import { $isTtsPlaying } from "~api/tts";

import { TtsMessage } from "../atoms/TtsMessage";
import { TtsNickname } from "../atoms/TtsNickname";
import { Box, OverlayCard } from "~ui";

const Wrapper = styled(Box)`
  bottom: 60px;
  left: 50%;
  opacity: ${props => (props.active ? 1 : 0)};
  position: absolute;
  transform: translate(-50%, 0);
  transition: opacity 0.5s ease-out;
  width: 400px;
`;

export const TtsOverlay = () => {
  const isVisible = useStore($isTtsPlaying);

  return (
    <Wrapper cols={["1fr"]} active={isVisible}>
      <OverlayCard title={<TtsMessage />}>
        <TtsNickname />
      </OverlayCard>
    </Wrapper>
  );
};
