import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../interaction/interaction.component';
import { TimeService } from '../../core/providers/time.service';

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  @Input() selectedChat: any;
  @Input() side: any;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {

  }

  getElapsedTime(timestamp: string): string {
    return this.timeService.getElapsedTime(timestamp);
  }
}
