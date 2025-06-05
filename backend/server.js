const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const listeners = require("./events/listener");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket to push events to frontend
wss.on("connection", (ws) => {
  console.log("Frontend connected via WebSocket");

  // Attach listeners for each event
  const onRegistered = (data) => ws.send(JSON.stringify({ type: "Registered", data }));
  const onVerified = (data) => ws.send(JSON.stringify({ type: "Verified", data }));

  listeners.onRegistered.push(onRegistered);
  listeners.onVerified.push(onVerified);

  // Cleanup on disconnect
  ws.on("close", () => {
    listeners.onRegistered = listeners.onRegistered.filter(fn => fn !== onRegistered);
    listeners.onVerified = listeners.onVerified.filter(fn => fn !== onVerified);
  });
});

// Start server
server.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}`);
});
