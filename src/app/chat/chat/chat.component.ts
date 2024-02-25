import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { InteractionComponent } from '../interaction/interaction.component';

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

}
