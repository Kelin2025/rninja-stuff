import Polly from "polly-tts";

export const polly = new Polly({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET
});
