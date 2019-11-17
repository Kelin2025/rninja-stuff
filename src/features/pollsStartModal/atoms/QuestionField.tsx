import { createInputField } from "~ui/logic/form";
import { $question, questionFieldChanged } from "../logic/form";

import { Input } from "~ui";

export const QuestionField = createInputField({
  label: "Question",
  store: $question,
  onChange: questionFieldChanged,
  isRequired: true,
  view: Input
});
