import { WebSocketClient } from 'redux-websocket/lib/client';
import { useWebSocketClient } from 'redux-websocket/lib/rpc/client';

export const webSocketClient = new WebSocketClient({url: 'ws://localhost:8080/'});
useWebSocketClient(webSocketClient);
console.log('using websocket');
