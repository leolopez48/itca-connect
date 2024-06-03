import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Http from '../../core/providers/http.service';

@Injectable()
export class ChatService extends Http {
  // private webSocket: Socket;

  baseUrl = 'http://192.168.1.253:3001/api'
  // baseUrl = 'http://127.0.0.1:3000/api'

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
    console.log(chat._id)
    return await this.get('/message/' + chat._id)
  }

  async sendMessage(text: String, chatId: String, senderId: String) {
    return this.post('/message', {
      text,
      chatId,
      senderId
    })
  }
}