import { model, Schema } from "mongoose";

export const TtsMessageSchema = new Schema({
  nickname: String,
  text: String,
  played: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const TtsMessageModel = model("TtsMessage", TtsMessageSchema);
