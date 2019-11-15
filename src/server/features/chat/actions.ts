import { createSocketSender } from "../../core/socket";

export const sendMessageEvent = createSocketSender("chat:message");
