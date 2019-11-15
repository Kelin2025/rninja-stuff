import { model, Schema } from "mongoose";

export const TtsMessageSchema = new Schema({
  nickname: String,
  text: String,
  played: Boolean
});

export const TtsMessageModel = model("TtsMessage", TtsMessageSchema);
