import * as React from "react";
import { useList } from "effector-react";

import {
  $answers,
  answerAdded,
  answerChanged,
  answerRemoved
} from "../logic/form";

import TrashIcon from "~ui/assets/icons/trash.svg";
import { Field, Box, Input, ClickableIcon, Button } from "~ui";

export const AnswersField = () => {
  return (
    <Field label="Answers" isRequired>
      <Box flow="row" cols={["1fr"]}>
        {useList($answers, (answer, idx) => (
          <Box flow="column" cols={["1fr", "max-content"]}>
            <Input
              value={answer}
              onChange={value => answerChanged({ idx, value })}
            />
            <ClickableIcon
              icon={TrashIcon}
              onClick={() => answerRemoved(idx)}
            />
          </Box>
        ))}
        <Button onClick={answerAdded}>Add Answer</Button>
      </Box>
    </Field>
  );
};
