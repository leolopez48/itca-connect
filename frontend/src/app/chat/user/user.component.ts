import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderComponent } from '../../components/layouts/loader/loader.component';
import { ChatService } from '../providers/chat.service';

export interface IUser {
  name: string,
  photo: string,
  email: string,
  carnet: string
}

@Component({
  selector: 'chat-user',
  standalone: true,
  imports: [
    LoaderComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  isLoading: Boolean = false;
  users: any = [];
  role: any = '';
  userLoggedIn: String = ""
  @Output() selectUserEvent = new EventEmitter<string>();

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.isLoading = true;

    this.userLoggedIn = localStorage.getItem('userName') || ''
    this.role = localStorage.getItem('role') || ''

    this.getChats()
  }

  // selectUser = (user: IUser): void => {
  //   console.log(user)
  // }

  getChats = async () => {
    try {
      this.isLoading = true;
      if (!this.userLoggedIn) {
        console.log("Sin usuario para obtener chats")
        return;
      }

      const response: any = await this.chatService.getChats(this.userLoggedIn);

      this.users = response.data;
      this.isLoading = false;
      // console.log(response);

    } catch (error: any) {
      this.isLoading = false;
      throw new Error(error)
    }
  }

  labelChat = (user: String) => {
    if (user === this.userLoggedIn) {
      return "Tú"
    } else if (this.role != "Administrador") {
      return user
    } else {
      return user
    }
  }

  getMessages = (chat: any) => {
    this.selectUserEvent.emit(chat)
    localStorage.setItem('chat', chat._id)
  }
}
