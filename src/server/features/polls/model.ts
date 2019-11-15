import { model, Schema } from "mongoose";

export const PollSchema = new Schema({
  question: String,
  answers: [String],
  votes: [Number],
  duration: Object,
  expiresAt: Number,
  ended: Boolean
});

export const PollModel = model("Poll", PollSchema);
