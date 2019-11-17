import * as React from "react";

import { savePressed, cancelPressed } from "../logic/controls";

import { QuestionField } from "../atoms/QuestionField";
import { AnswersField } from "../atoms/AnswersField";
import { DurationField } from "../atoms/DurationField";
import { Box, Modal, ModalWithTitleTemplate, Button } from "~ui";

const Controls = () => {
  return (
    <Box flow="column">
      <Button type="save" onClick={savePressed}>
        Start
      </Button>
      <Button type="cancel" onClick={cancelPressed}>
        Cancel
      </Button>
    </Box>
  );
};

export const PollsStartModal = () => {
  return (
    <Modal
      name="pollsStart"
      view={ModalWithTitleTemplate}
      viewProps={{ title: "Start Poll", controls: <Controls /> }}
    >
      <Box flow="row" cols={["1fr"]}>
        <QuestionField />
        <AnswersField />
        <DurationField />
      </Box>
    </Modal>
  );
};
