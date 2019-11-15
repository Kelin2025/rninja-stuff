import http from "http";

import { app } from "./app";

export const server = http.createServer(app);

server.listen(process.env.PORT || 8080);
