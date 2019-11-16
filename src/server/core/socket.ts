import * as WebSocket from "ws";
import { Event, forward, createEvent } from "effector";

import { server } from "./server";

type InputData = {
  client: Object;
  type: string;
  options: object;
};

type OutputData = {
  client?: Object;
  type: string;
  options?: object;
};

export const socketSendMessage = createEvent<OutputData>();
export const socketMessageReceived = createEvent<InputData>();
export const socketClientConnected = createEvent<{}>();

export const wss = new WebSocket.Server({ server });

export const socketOn = <T>(target: string): Event<T> =>
  socketMessageReceived
    .filter({ fn: ({ type }) => type === target })
    .map(evt => evt.options);

export const createSocketSender = <T extends OutputData["options"]>(
  type: string
): Event<{ options: T; client?: Object }> => {
  const evt = createEvent<{ options: T; client?: Object }>();
  forward({
    from: evt.map(({ options, client }) => ({ type, options, client })),
    to: socketSendMessage
  });
  return evt;
};

wss.on("connection", async ws => {
  console.log("WS: connected");
  ws.isAlive = true;
  ws.on("pong", () => {
    ws.isAlive = true;
  });
  ws.on("message", data => {
    socketMessageReceived({ client: ws, ...JSON.parse(data) });
  });
  socketClientConnected(ws);
});

socketSendMessage.watch(({ client, type, options }) => {
  const json = JSON.stringify({ type, options });
  if (client) {
    client.send(json);
  } else {
    wss.clients.forEach(client => {
      client.send(json);
    });
  }
});

setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 20000);
