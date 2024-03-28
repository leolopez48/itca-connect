import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService } from '../providers/calendar.service';
import { format, lastDayOfMonth } from 'date-fns';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid'
import { DialogModule } from 'primeng/dialog';

class IEvent {
  date: String;
  date_end: String;
  date_start: String;
  end: String;
  id: Number;
  name: String;
  start: String;
  title: String;
  type_event: String;
}

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FullCalendarModule,DialogModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    locale: esLocale,
    initialDate: '2024-01-01',
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,timeGridDay'
    },
    timeZone: 'America/El_Salvador',
    events: [
      // { title: 'event 1', date: '2024-03-01', color: '#030303' },
      // { title: 'event 2', date: '2024-03-02' }
    ],
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: true,
      meridiem: 'short'
    }
  };
  today: Date = new Date();
  initialDate: String = format(this.today, 'yyyy-MM-01');
  lastDateOfMonth: String = format(lastDayOfMonth(this.today), 'yyyy-MM-dd')
  selectedEvent: IEvent;
  visible: boolean = false;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private calendarService: CalendarService) { }

  async ngOnInit() {

    this.calendarOptions.initialDate = format(this.today, 'yyyy-MM-01')

    await this.getEvents()
    this.listener()
    
  }

  async getEvents() {
    const response = await this.calendarService.getEvents(this.initialDate, this.lastDateOfMonth);

    this.calendarOptions.events = response.data;
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  handleEventClick(arg: any) {
    this.selectedEvent = arg.event._def.extendedProps;
  }

  listener() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('height','100vh');
    document.querySelector('.fc-next-button')?.addEventListener('click', async () => {
      this.initialDate = format(new Date(calendarApi.getCurrentData().viewApi.activeStart), 'yyyy-MM-dd 00:00');
      this.lastDateOfMonth = format(new Date(calendarApi.getCurrentData().viewApi.activeEnd), 'yyyy-MM-dd 23:59');

      await this.getEvents()
      console.log(this.calendarOptions.events)
    })

    document.querySelector('.fc-prev-button')?.addEventListener('click', async () => {
      this.initialDate = format(new Date(calendarApi.getCurrentData().viewApi.activeStart), 'yyyy-MM-dd 00:00');
      this.lastDateOfMonth = format(new Date(calendarApi.getCurrentData().viewApi.activeEnd), 'yyyy-MM-dd 23:59');

      await this.getEvents()
      console.log(this.calendarOptions.events)
    })
  }
  
  showDialog() {
    this.visible = true;
}
}
