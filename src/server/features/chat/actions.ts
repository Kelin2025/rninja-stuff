import { createSocketSender } from "~server/core/socket";

export const sendMessageEvent = createSocketSender("chat:message");
