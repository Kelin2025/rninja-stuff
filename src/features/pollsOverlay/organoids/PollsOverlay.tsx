import * as React from "react";
import styled from "styled-components";
import { useStore } from "effector-react";

import { $hasLivePoll } from "~api/polls";

import helpMeImage from "~ui/assets/images/help-me.png";
import attentionIconImage from "~ui/assets/images/attention-icon.png";
import { Box } from "~ui";
import { Answers } from "./Answers";
import { PollTimer } from "../atoms/PollTimer";
import { PollQuestion } from "../atoms/PollQuestion";

const Wrapper = styled(Box)`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 20px 20px 0;
  left: 0;
  padding: 25px;
  position: absolute;
  top: 50px;
  transform: ${props => (props.active ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.5s ease-out;
  width: 600px;
`;

const Title = styled.h2`
  margin: 0;
`;

export const PollsOverlay = () => {
  const isVisible = useStore($hasLivePoll);

  return (
    <Wrapper cols={["1fr"]} active={isVisible}>
      <Box flow="column" justify="space-between">
        <img src={helpMeImage} />
        <PollTimer />
      </Box>
      <Title>
        <PollQuestion />
      </Title>
      <Answers />
      <Box flow="column">
        <img src={attentionIconImage} />
        <b>Just write one of the options in the chat</b>
      </Box>
    </Wrapper>
  );
};
