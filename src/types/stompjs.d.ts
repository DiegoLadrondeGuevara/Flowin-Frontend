declare module 'stompjs' {
  import { Client as StompClient, Frame, Message } from '@stomp/stompjs';
  export function over(ws: WebSocket): StompClient;
  export { StompClient as Client, Frame, Message };
}
