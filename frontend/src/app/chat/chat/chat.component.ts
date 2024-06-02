import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { InteractionComponent } from '../interaction/interaction.component';
import { ChatService } from '../providers/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    UserComponent,
    InteractionComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: any = []
  role: String = "Student"
  carnet: any = ""
  chats: any = []
  selectedChat: String = ""

  constructor(private chatService: ChatService) { }

  async ngOnInit() {
    this.role = localStorage.getItem('role') || 'Student'
    this.carnet = localStorage.getItem('userName') || ''

    try {
      let response: any = await this.chatService.getChats(this.carnet)

      if (response.data.length > 0 && this.role == 'Student') {
        this.chats = response.data[0]
        this.selectedChat = response.data[0]

        this.selectChat(this.chats)
      }

      if (response.data.length == 0 && this.role == 'Student') {
        response = await this.chatService.create(this.carnet, '329518')
      }

      if (response.data.length > 0 && this.role != 'Student') {
        this.chats = response.data
      }

      const div: any = document;
      setTimeout(() => {
        div.querySelector('.chat-messages').scrollTo({ bottom: 0, top: 150000 });;
      }, 100);
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  selectChat = async (chat: String) => {
    const response: any = await this.chatService.getMessages(chat)

    this.messages = response.data;
    console.log(response);
  }
}
