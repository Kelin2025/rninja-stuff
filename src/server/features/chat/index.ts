import { forward } from "effector";

import { messageReceived } from "../../core/tmi";
import { sendMessageEvent } from "./actions";

forward({
  from: messageReceived,
  to: sendMessageEvent
});
