import { forward } from "effector";
import { app } from "../../../server/core/app";

import {
  sendTts,
  sendTtsPlayed,
  createTtsMessage,
  removeTtsMessage,
  generateTtsAudio,
  getTtsMessageById,
  markTtsMessageAsPlayed
} from "./actions";

app.post("/api/tts", async (req, res) => {
  res.send(await createTtsMessage(req.body));
});

app.post("/api/tts/:id/play", async (req, res) => {
  const ttsMessage = await getTtsMessageById({ id: req.params.id });
  await markTtsMessageAsPlayed({ id: req.params.id });
  const generated = await generateTtsAudio({ text: ttsMessage.text });
  sendTts(generated);
  res.send(generated);
});

app.delete("/api/tts/:id", async (req, res) => {
  res.send(await removeTtsMessage({ id: req.params.id }));
});

forward({
  from: markTtsMessageAsPlayed.done.map(r => r.params),
  to: sendTtsPlayed
});
