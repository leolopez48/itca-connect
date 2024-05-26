import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarService } from './providers/calendar.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventComponent } from './event/event.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    DialogModule
  ],
  providers: [
    CalendarService
  ]
})
export class CalendarModule { }
