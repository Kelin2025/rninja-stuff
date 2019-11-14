import { filterBy } from "~lib/filters";
import { createStore } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { TtsItem } from "./types";

export const $ttsVolume = createStore<number>(1);
export const $ttsItems = createStore<TtsItem[]>([
  { _id: "test", nickname: "Kelin2025", text: "Lol kek", played: false },
  {
    _id: "test",
    nickname: "Kelin2025",
    text: "Lol kek played",
    played: true
  }
]);

export const $ttsQueue = $ttsItems.map(filterBy(item => !item.played));
export const $ttsHistory = $ttsItems.map(filterBy(item => !!item.played));

export const useTtsMessage = createUseListItem({
  store: $ttsItems,
  check: (id: string, ttsItem) => ttsItem._id === id
});
