const express = require("express");
const { createServer } = require("http");
const { Server, Socket } = require("socket.io");

// Database connection
require("./database/");

const app = express();

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
  },
});
module.exports = {
  http,
  io,
};
