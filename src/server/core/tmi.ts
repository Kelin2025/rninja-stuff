import tmi from "tmi.js";
import fetch from "node-fetch";
import { createEvent } from "effector";

type MessagePayload = {
  channel: string;
  message: string;
  userstate: {};
  nickname: string;
  isSub: boolean;
  isSelf: boolean;
};

type SubPayload = {
  channel: string;
  nickname: string;
  months: number;
  streak: number;
};

export const messageSent = createEvent<string>("messageSent");
export const messageReceived = createEvent<MessagePayload>("messageReceived");
export const subscriptionReceived = createEvent<SubPayload>(
  "subscriptionReceived"
);

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: "RubbetTtsBot",
    password: process.env.TMI_TOKEN
  },
  channels: [`#${process.env.TMI_NICKNAME}`]
};

export const chat = new tmi.Client(options);

export const doTwitchRequest = ({ token, path, ...payload }) =>
  fetch(`https://api.twitch.tv/${path}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `OAuth ${token}`
    },
    ...payload
  }).then(r => r.json());

chat.connect();

chat.on("message", (channel, userstate, message, isSelf) => {
  messageReceived({
    channel,
    userstate,
    message,
    nickname: userstate["display-name"],
    isSub: !!userstate.subscriber,
    isSelf: isSelf
  });
});

chat.on("subscription", (channel, username, method, message, userstate) => {
  subscriptionReceived({
    channel,
    nickname: userstate["display-name"],
    months: 1,
    streak: 1
  });
});

chat.on("resub", (channel, username, months, message, userstate) => {
  subscriptionReceived({
    channel,
    nickname: userstate["display-name"],
    months: ~~userstate["msg-param-cumulative-months"],
    streak: userstate["msg-param-should-share-streak"] ? months : 1
  });
});

messageSent.watch(message => {
  chat.say(process.env.TMI_NICKNAME, message);
});
