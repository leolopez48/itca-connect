import { Component, Input } from '@angular/core';
import { IMessage } from '../interaction/interaction.component';

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message: IMessage;

  constructor() { }
}
