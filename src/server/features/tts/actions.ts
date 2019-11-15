import fs from "fs";
import path from "path";
import pify from "pify";
import { createEffect } from "effector";

import { polly } from "~server/core/polly";
import { TtsMessageModel } from "./model";
import { createSocketSender } from "~server/core/socket";

const textToSpeech = pify(polly.textToSpeech);
const soundPath = path.join(__dirname, "polly-tts.mp3");

export const sendTtsPlayed = createSocketSender("tts:played");
export const sendTts = createSocketSender("tts:sent");

export const getTtsMessages = createEffect({
  handler: () => {
    return TtsMessageModel.find({}).exec();
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
  handler: ({ text }) =>
    new Promise((resolve, reject) => {
      try {
        const fileStream = fs.createWriteStream(soundPath);

        const safeText = text
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .slice(0, 1000);

        const audioStream = textToSpeech({ text: safeText });
        audioStream.pipe(fileStream);

        audioStream.on("end", () => {
          resolve({
            text,
            path: soundPath,
            remove: () => fs.unlink(soundPath, () => {})
          });
        });
      } catch (err) {
        reject(err);
      }
    })
});
