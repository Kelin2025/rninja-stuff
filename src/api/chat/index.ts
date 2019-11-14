import { createStore } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { Message } from "./types";

export const $chatMessagesList = createStore<Message[]>([
  { _id: "lul", nickname: "Kelin2025", text: "Hello there" }
]);

export const useChatMessage = createUseListItem({
  store: $chatMessagesList,
  check: (id: string, message) => message._id === id
});
