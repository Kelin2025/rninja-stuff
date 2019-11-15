import { model, Schema } from "mongoose";

export const PollTemplateSchema = new Schema({
  question: String,
  answers: [String],
  duration: Object
});

export const PollTemplateModel = model("PollTemplate", PollTemplateSchema);
