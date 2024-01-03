import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// io instance all connections
const io = new Server(server);
// socket.io
//socket===client
io.on("connection", (socket) => {
  //   console.log("A new user ha connected", socket.id);
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log("server started"));
