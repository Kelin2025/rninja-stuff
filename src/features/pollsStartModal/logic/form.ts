import { createStore, createEvent, createStoreObject } from "effector";

import { Duration } from "~lib/time-fns";

export const questionFieldChanged = createEvent<string>();
export const answerAdded = createEvent<void>();
export const answerChanged = createEvent<{ idx: number; value: string }>();
export const answerRemoved = createEvent<number>();
export const durationFieldChanged = createEvent<Duration>();

export const $question = createStore<string>("");
export const $answers = createStore<string[]>([""]);
export const $duration = createStore<Duration>({ type: "minutes", value: 1 });

export const $formData = createStoreObject({
  question: $question,
  answers: $answers,
  duration: $duration
});

$question.on(questionFieldChanged, (state, value) => value);

$answers
  .on(answerAdded, state => [...state, ""])
  .on(answerChanged, (state, { idx, value }) =>
    state.map((cur, curIdx) => (curIdx === idx ? value : cur))
  )
  .on(answerRemoved, (state, idx) =>
    state.filter((cur, curIdx) => curIdx !== idx)
  );

$duration.on(durationFieldChanged, (state, value) => value);
