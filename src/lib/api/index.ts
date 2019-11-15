import pathToRegexp from "path-to-regexp";
import { Event, forward, createEvent, createEffect } from "effector";

type Data = {
  type: string;
  options?: object;
  retries?: number;
};

const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "https://rubberninja-dashboard.herokuapp.com/"
    : "https://rubberninja-dashboard.herokuapp.com/";

const WS_ROOT =
  process.env.NODE_ENV === "development"
    ? "wss://rubberninja-dashboard.herokuapp.com/"
    : "wss://rubberninja-dashboard.herokuapp.com/";

export const api = (uri, params) =>
  fetch(`${API_ROOT}${uri}`, {
    ...params,
    headers: {
      ...params.headers,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(r => r.json());

export const socket = new WebSocket(WS_ROOT);

export const socketSendMessage = createEvent<Data>("socketSendMessage");

export const socketMessageReceived = createEvent<Data>("socketMessageReceived");

// NOTE: Typescript is garbage
export const socketOn = <T>(target: string): Event<T> =>
  socketMessageReceived
    .filter({ fn: ({ type }) => type === target })
    .map(evt => evt.options);

export const createSocketSender = <T extends Data["options"]>(
  type: string
): Event<T> => {
  const evt = createEvent<T>();
  forward({
    from: evt.map(options => ({ type, options })),
    to: socketSendMessage
  });
  return evt;
};

export const createApiSender = <T extends {}, R extends {}>(uri, method) => {
  let handler;
  let path = pathToRegexp.compile(uri);
  if (method === "GET") {
    handler = ({ params }) => api(path(params), { method });
  } else {
    handler = ({ body, params }: { body: T; params: {} }) =>
      api(path(body, params), { method, body: JSON.stringify(body) });
  }
  return createEffect<{ body: T; params?: {} }, R, any>({ handler });
};

socket.onmessage = evt => {
  socketMessageReceived(JSON.parse(evt.data));
};

socketSendMessage.watch(({ type, options, retries = 0 }) => {
  if (socket.readyState !== WebSocket.OPEN && retries < 5) {
    setTimeout(() => {
      socketSendMessage({ type, options, retries: retries + 1 });
    }, 500);
  } else {
    socket.send(JSON.stringify({ type, options }));
  }
});
