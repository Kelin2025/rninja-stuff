import { model, Schema } from "mongoose";

export const PollSchema = new Schema({
  question: String,
  answers: [String],
  votes: [Number],
  voters: [String],
  duration: Object,
  expiresAt: Number,
  ended: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const PollModel = model("Poll", PollSchema);
