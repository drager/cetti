import * as http from 'http';
import express from 'express';
import { WebSocketServer } from 'redux-websocket/lib/server';
import { server as WebSocket } from 'websocket';

export let webSocketServer;

export const createWebSocketServer = () => {
  const app = express();
  const server = http.createServer(app);

  app.get('/', (req, res) => {
    res.render('index', {layout: false});
  });
  server.listen(8080);

  const ws = new WebSocket({httpServer: server});

  webSocketServer = new WebSocketServer(ws);
};
