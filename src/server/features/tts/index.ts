import { forward, sample } from "effector";
import { app } from "../../../server/core/app";

import {
  sendTtsAudio,
  sendTtsPlayed,
  sendTtsCreated,
  sendTtsRemoved,
  getTtsMessages,
  createTtsMessage,
  removeTtsMessage,
  generateTtsAudio,
  getTtsMessageById,
  changeTtsVolume,
  ttsVolumeChanged,
  markTtsMessageAsPlayed
} from "./actions";
import { socketClientConnected } from "~server/core/socket";
import { $ttsVolume } from "./cache";

app.get("/api/tts", async (req, res) => {
  res.send(await getTtsMessages());
});

app.post("/api/tts", async (req, res) => {
  res.send(await createTtsMessage(req.body));
});

app.post("/api/tts/:id/play", async (req, res) => {
  const ttsMessage = await getTtsMessageById({ id: req.params.id });
  console.log("tts found");
  await markTtsMessageAsPlayed({ id: req.params.id });
  console.log("marked as played");
  const generated = await generateTtsAudio({ text: ttsMessage.text });
  console.log("audio generated");
  sendTtsAudio({ options: generated });
  console.log("socket sent");
  res.send(generated);
});

app.delete("/api/tts/:id", async (req, res) => {
  res.send(await removeTtsMessage({ id: req.params.id }));
});

forward({
  from: markTtsMessageAsPlayed.done.map(({ params }) => ({ options: params })),
  to: sendTtsPlayed
});

forward({
  from: createTtsMessage.done.map(({ result }) => ({ options: result })),
  to: sendTtsCreated
});

forward({
  from: removeTtsMessage.done.map(({ params }) => ({ options: params })),
  to: sendTtsRemoved
});

forward({
  from: changeTtsVolume.done.map(({ result }) => ({
    options: { volume: result.volume }
  })),
  to: ttsVolumeChanged
});

forward({
  from: sample($ttsVolume, socketClientConnected, (volume, client) => ({
    client,
    options: { volume }
  })),
  to: ttsVolumeChanged
});
