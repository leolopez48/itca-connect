import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { CoreService } from '../core/providers/core.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../core/providers/notification.service';
import { TooltipModule } from 'primeng/tooltip';
import { NotificationComponent } from './notification.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule
  ],
  providers: [
    CoreService,
    NotificationService
  ]
})
export class NotificationModule { }
