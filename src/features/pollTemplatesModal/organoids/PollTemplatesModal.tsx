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
        Save
      </Button>
      <Button type="cancel" onClick={cancelPressed}>
        Cancel
      </Button>
    </Box>
  );
};

export const PollTemplatesModal = () => {
  return (
    <Modal
      name="pollTemplates"
      view={ModalWithTitleTemplate}
      viewProps={{ title: "Poll Template", controls: <Controls /> }}
    >
      <Box flow="row" cols={["1fr"]}>
        <QuestionField />
        <AnswersField />
        <DurationField />
      </Box>
    </Modal>
  );
};
