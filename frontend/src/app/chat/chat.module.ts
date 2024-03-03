import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from './providers/chat.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule,
  ],
  providers: [ChatService]
})
export class ChatModule {
}
