import { createStore } from "effector";
import { ttsAudioReceived } from "~api/tts";

export const $isTtsOverlayShown = createStore(false);
export const $ttsMessage = createStore("");
export const $ttsNickname = createStore("");

$isTtsOverlayShown.on(ttsAudioReceived, () => true);

$ttsMessage.on(ttsAudioReceived, (state, { text }) => text);

$ttsNickname.on(ttsAudioReceived, (state, { nickname }) => nickname);
