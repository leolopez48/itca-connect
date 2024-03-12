import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: true,
    locale: 'es',
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    events: [
      { title: 'event 1', date: '2024-03-01', color: '#030303' },
      { title: 'event 2', date: '2024-03-02' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  handleEventClick(arg: any) {
    console.log(arg.event)
    // alert('date click! ' + arg.dateStr)
  }

  toggleWeekends(e: any) {
    e.preventDefault();
    this.calendarOptions.weekends = true // toggle the boolean!
  }

  toggleMonths(e: any) {
    e.preventDefault();
    this.calendarOptions.weekends = false // toggle the boolean!
  }
}
