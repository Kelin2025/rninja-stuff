import { createStore } from "effector";
import { createUseListItem } from "~lib/effector-hook-factory";

import { Message } from "./types";
import { socketOn } from "~lib/api";

export const chatMessageReceived = socketOn<Message>("chat:message");

export const $chatMessagesList = createStore<Message[]>([]);

export const useChatMessage = createUseListItem({
  store: $chatMessagesList,
  check: (id: string, message) => message._id === id
});

$chatMessagesList.on(chatMessageReceived, (state, message) =>
  [message, ...state].slice(0, 20)
);
