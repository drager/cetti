import { WebSocketClient } from 'redux-websocket/lib/client';

export const webSocketClient = new WebSocketClient({url: 'ws://localhost:8080/'});
