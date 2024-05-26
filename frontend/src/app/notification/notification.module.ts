import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { CoreService } from '../core/providers/core.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../core/providers/notification.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CoreService,
    NotificationService
  ]
})
export class NotificationModule { }
