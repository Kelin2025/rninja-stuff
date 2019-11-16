import {
  guard,
  split,
  sample,
  createStore,
  createEvent,
  combine
} from "effector";

import { modal } from "~ui/logic/modals";
import { PollTemplate } from "~api/pollsTemplates/types";
import { $id, $question, $answers, $duration, $formData } from "./form";
import { createPollTemplate, updatePollTemplate } from "~api/pollsTemplates";

export const editPollTemplateModalOpened = createEvent<PollTemplate | null>();
export const savePressed = createEvent<void>();
export const cancelPressed = createEvent<void>();

const editStarted = split(editPollTemplateModalOpened, {
  new: poll => !poll || !poll._id,
  edit: poll => !!poll && !!poll._id
});

export const $isEditing = createStore<boolean>(false)
  .on(editStarted.new, () => false)
  .on(editStarted.edit, () => true);

$id
  .on(editStarted.new, () => null)
  .on(editStarted.edit, (state, { _id }) => _id);

$question
  .on(editStarted.new, () => "")
  .on(editStarted.edit, (state, { question }) => question);

$answers
  .on(editStarted.new, () => [""])
  .on(editStarted.edit, (state, { answers }) => answers);

$duration
  .on(editStarted.new, () => ({ type: "minutes", value: 1 }))
  .on(editStarted.edit, (state, { duration }) => duration);

guard({
  source: sample($formData, savePressed, body => ({ body })),
  filter: $isEditing.map(bool => !bool),
  target: createPollTemplate
});

guard({
  source: sample(
    combine($id, $formData, (id, body) => ({ params: { id }, body })),
    savePressed
  ),
  filter: $isEditing,
  target: updatePollTemplate
});

modal("pollTemplates")
  .openOn(editPollTemplateModalOpened)
  .closeOn(savePressed)
  .closeOn(cancelPressed);
