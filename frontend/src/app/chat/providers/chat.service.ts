import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ChatService {
  private webSocket: Socket;

  constructor() {
    this.webSocket = new Socket({
      url: "http://localhost:3000",
      options: {},
    });
  }

  // this method is used to start connection/handhshake of socket with server
  connectSocket(message: string) {
    this.webSocket.emit(message);
  }

  // this method is used to get response from server
  receiveStatus() {
    return this.webSocket.fromEvent('/get-response');
  }

  // this method is used to end web socket connection
  disconnectSocket() {
    this.webSocket.disconnect();
  }
}