import { filterBy } from "~lib/filters";
import { createStore, createEvent } from "effector";
import { createApiSender, socketOn } from "~lib/api";
import { createUseListItem } from "~lib/effector-hook-factory";

import { TtsItem } from "./types";

export const getTtsItems = createApiSender<void, TtsItem[]>("api/tts", "GET");
export const createTtsMessage = createApiSender<
  { nickname: string; text: string },
  TtsItem
>("api/tts", "POST");
export const playTtsMessage = createApiSender<void, TtsItem>(
  "api/tts/:id/play",
  "POST"
);
export const deleteTtsMessage = createApiSender<void, TtsItem>(
  "api/tts/:id",
  "DELETE"
);

export const ttsCreated = socketOn<TtsItem>("tts:created");
export const ttsPlayed = socketOn<{ id: string }>("tts:played");
export const ttsRemoved = socketOn<{ id: string }>("tts:removed");
export const ttsAudioReceived = socketOn<{
  text: string;
  path: string;
  nickname: string;
  duration: number;
}>("tts:audio");
export const ttsAudioPlayed = createEvent();

export const $isTtsPlaying = createStore(false);
export const $ttsItems = createStore<TtsItem[]>([]);

export const $ttsQueue = $ttsItems.map(filterBy(item => !item.played));
export const $ttsHistory = $ttsItems.map(filterBy(item => !!item.played));

export const useTtsMessage = createUseListItem({
  store: $ttsItems,
  check: (id: string, ttsItem) => ttsItem._id === id
});

$ttsItems
  .on(getTtsItems.done, (state, { result }) => result)
  .on(ttsCreated, (state, ttsMessage) => [ttsMessage, ...state])
  .on(ttsPlayed, (state, { id }) =>
    state.map(cur => (cur._id === id ? { ...cur, played: true } : cur))
  )
  .on(ttsRemoved, (state, { id }) => state.filter(cur => cur._id !== id));

$isTtsPlaying.on(ttsAudioReceived, () => true).on(ttsAudioPlayed, () => false);

getTtsItems();
