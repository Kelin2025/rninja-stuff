import { forward } from "effector";

import { messageReceived } from "~server/core/tmi";
import { sendMessageEvent } from "./actions";

forward({
  from: messageReceived,
  to: sendMessageEvent
});
