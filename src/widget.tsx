import React from "react";
import ReactDOM from "react-dom";

import { ttsAudioReceived, ttsAudioPlayed } from "~api/tts";

import { TtsOverlay } from "~features/ttsOverlay";
import { PollsOverlay } from "~features/pollsOverlay";

ttsAudioReceived.watch(({ duration }) => {
  const audio = new Audio();
  audio.src = `https://rubberninja-dashboard.herokuapp.com/polly-tts.mp3?cache=${Math.random()}`;
  audio.play();
  setTimeout(ttsAudioPlayed, duration * 1000);
});

const App = () => {
  return (
    <>
      <TtsOverlay />
      <PollsOverlay />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
