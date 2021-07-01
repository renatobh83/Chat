import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { routes } from "./routes"
// Database connection
import "./database";

const app = express();
app.use(express.json())
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});
app.use(routes)


export {
  http,
  io,
};
