import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Http from '../../core/providers/http.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChatService extends Http {
  // private webSocket: Socket;

  baseUrl = (environment as any).chatApi;

  super() { }

  async create(user: String, professor: String) {
    return await this.post('/chat/', {
      user,
      professor
    })
  }

  async getChats(user: String) {
    return await this.get('/chat/' + user)
  }

  async getMessages(chat: any) {
    // console.log(chat._id)
    return await this.get('/message/' + chat)
  }

  async sendMessage(text: String, chatId: String, senderId: String) {
    return this.post('/message', {
      text,
      chatId,
      senderId
    })
  }
}