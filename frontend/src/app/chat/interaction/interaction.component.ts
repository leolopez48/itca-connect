import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

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
  imports: [ReactiveFormsModule, MessageComponent],
  templateUrl: './interaction.component.html',
  styleUrl: './interaction.component.scss'
})
export class InteractionComponent {
  message: FormControl = new FormControl('');
  messages: IMessage[] = [];
  actualUser: IUser = {
    name: 'Leonel',
    photo: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg',
    email: 'leonel.lopez19@itca.edu.sv',
    carnet: '040119',
  };

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.initializeSocketConnection();
  }

  ngOnDestroy() {
    // this.chatService.disconnectSocket();
  }

  initializeSocketConnection = () => {
    this.chatService.connectSocket('message');
  }

  sendMessage = () => {
    if (!this.message) {
      return;
    }

    this.messages.push({
      id: uuidv4(),
      user: this.actualUser,
      message: this.message.value,
    });

    this.message.setValue('');

    console.log(this.messages)
  }
}
