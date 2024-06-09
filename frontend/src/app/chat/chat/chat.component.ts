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
  selectedChat: any = ""

  constructor(private chatService: ChatService) { }

  async ngOnInit() {
    this.role = localStorage.getItem('role') || 'Student'
    this.carnet = localStorage.getItem('userName') || ''

    try {
      let response: any = await this.chatService.getChats(this.carnet)

      if (response.data.length > 0 && this.role == 'Student') {
        this.chats = response.data[0]._id
        // console.log(this.chats)
        this.selectedChat = response.data[0]._id
        // console.log(this.selectedChat._id)
        localStorage.setItem('chat', response.data[0]._id)

        this.selectChat(this.chats)
      }

      if (response.data.length == 0 && this.role == 'Student') {
        response = await this.chatService.create(this.carnet, '000001')
      }

      if (response.data.length > 0 && this.role != 'Student') {
        this.chats = response.data
      }

      const div: any = document;

      setInterval(async () => {
        const chat = localStorage.getItem('chat') ?? '';
        // console.log(chat)
        if (chat) {
          await this.selectChat(chat)
        } else {
          console.log('Chat no seleccionado')
        }
        div.querySelector('.chat-messages').scrollTo({ bottom: 0, top: 150000 });;
      }, 5000)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  selectChat = async (chat: String) => {

    const response: any = await this.chatService.getMessages(chat)

    this.messages = response.data;
    // console.log(response);
  }

  changeChat = (chat: any) => {
    console.log(chat._id)
    this.selectedChat = chat._id;

    this.selectChat(this.selectedChat)
  }
}
