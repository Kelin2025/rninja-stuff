import fs from "fs";
import path from "path";
import pify from "pify";
import { createEffect } from "effector";
import { getAudioDurationInSeconds } from "get-audio-duration";

import { polly } from "../../../server/core/polly";
import { TtsMessageModel } from "./model";
import { createSocketSender } from "../../../server/core/socket";

const textToSpeech = pify((p, cb) => polly.textToSpeech(p, cb));
const soundPath = path.join(__dirname, "polly-tts.mp3");

export const sendTtsAudio = createSocketSender("tts:audio");
export const sendTtsPlayed = createSocketSender("tts:played");
export const sendTtsCreated = createSocketSender("tts:created");
export const sendTtsRemoved = createSocketSender("tts:removed");

export const getTtsMessages = createEffect({
  handler: () => {
    return TtsMessageModel.find({})
      .sort({ createdAt: -1 })
      .exec();
  }
});

export const getTtsMessageById = createEffect({
  handler: ({ id }) => {
    return TtsMessageModel.findOne({ _id: id }).exec();
  }
});

export const createTtsMessage = createEffect({
  handler: ({ nickname, text }) => {
    const ttsMessage = new TtsMessageModel();
    ttsMessage.nickname = nickname;
    ttsMessage.text = text;
    return ttsMessage.save();
  }
});

export const markTtsMessageAsPlayed = createEffect({
  handler: async ({ id }) => {
    const ttsMessage = await getTtsMessageById({ id });
    ttsMessage.played = true;
    return ttsMessage.save();
  }
});

export const removeTtsMessage = createEffect({
  handler: ({ id }) => {
    return TtsMessageModel.findOneAndRemove({ _id: id });
  }
});

export const generateTtsAudio = createEffect({
  handler: ({ text }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileStream = fs.createWriteStream(soundPath);

        const safeText = text
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .slice(0, 1000);

        const audioStream = await textToSpeech({
          text: safeText,
          voiceId: "Joanna"
        });
        audioStream.pipe(fileStream);

        audioStream.on("end", async () => {
          const duration = await getAudioDurationInSeconds(soundPath);
          resolve({
            text,
            path: soundPath,
            duration,
            remove: () => fs.unlink(soundPath, () => {})
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
});
