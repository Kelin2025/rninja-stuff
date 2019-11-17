import { createInputField } from "~ui/logic/form";
import { $duration, durationFieldChanged } from "../logic/form";

import { TimeInput } from "~ui";

export const DurationField = createInputField({
  label: "Duration",
  store: $duration,
  onChange: durationFieldChanged,
  isRequired: true,
  view: TimeInput
});
