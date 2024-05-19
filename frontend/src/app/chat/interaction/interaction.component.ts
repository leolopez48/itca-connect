import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { IUser } from '../user/user.component';
import { MessageComponent } from '../message/message.component';
import { ChatService } from '../providers/chat.service';

export interface IMessage {
  id: String,
  user: IUser,
  message: String,
}

@Component({
  selector: 'chat-interaction',
  standalone: true,
  imports: [ReactiveFormsModule, MessageComponent, ButtonModule, InputTextModule],
  templateUrl: './interaction.component.html',
  styleUrl: './interaction.component.scss'
})
export class InteractionComponent {
  message: FormControl = new FormControl('');
  userName: String = ''

  @Input() selectedUser = '';
  @Input() messages: any = [];
  @Input() selectedChat: any = {};

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || ''
  }

  sendMessage = async () => {
    if (!this.message) {
      return;
    }

    const user = localStorage.getItem('userName') || ''
    const chat = localStorage.getItem('chat') || ''

    const response: any = await this.chatService.sendMessage(this.message.value, chat, user)

    this.messages.push({
      _id: response.data._id,
      senderId: this.userName,
      text: this.message.value,
    });
    this.message.setValue('');

    const div: any = document;
    setTimeout(() => {
      div.querySelector('.chat-messages').scrollTo({ bottom: 0, top: 150000, behavior: "smooth" });;
    }, 100);
  }
}
