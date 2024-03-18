import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarService } from './providers/calendar.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [
    CalendarService
  ]
})
export class CalendarModule { }
