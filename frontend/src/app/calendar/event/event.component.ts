import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService } from '../providers/calendar.service';
import { format, lastDayOfMonth } from 'date-fns';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogModule } from 'primeng/dialog';
import { EventTypeService } from '../../admin/providers/event-type.service';
import { ITypeEvent } from '../../../model/event.interface';

class IEvent {
  date: string;
  date_end: string;
  date_start: string;
  end: string;
  id: number;
  name: string;
  start: string;
  title: string;
  type_event: string;
  color?: string; 
}

@Component({
  selector: 'app-event',
  standalone: false,
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
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
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: true,
      meridiem: 'short'
    },
    eventContent: (arg) => this.renderEventContent(arg)
  };
  today: Date = new Date();
  initialDate: string = format(this.today, 'yyyy-MM-01');
  lastDateOfMonth: string = format(lastDayOfMonth(this.today), 'yyyy-MM-dd');
  selectedEvent: IEvent;
  visible: boolean = false;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private calendarService: CalendarService, private getTypeService: EventTypeService) { }

  async ngOnInit() {
    this.calendarOptions.initialDate = format(this.today, 'yyyy-MM-01');
    await this.getEvents();
    this.listener();
    console.log(this.lastDateOfMonth);
  }

  async getEvents() {
    const response = await this.calendarService.getEvents(this.initialDate, this.lastDateOfMonth);
    const res = await this.getTypeService.getIndex();

    const eventos = response.data;
    const tiposEventos = res.data;

    const eventosConColor = eventos.map((evento: any) => {
      const tipoEvento = tiposEventos.find((tipo: ITypeEvent) => tipo.name === evento.type_event);
      return {
        ...evento,
        color: tipoEvento ? tipoEvento.color : '#000' // Color por defecto si no se encuentra el tipo
      };
    });

    this.calendarOptions.events = eventosConColor.map((evt: any) => ({
      id: evt.id,
      title: evt.title,
      start: evt.date_start,
      end: evt.date_end,
      name: evt.name,
      color: evt.color,
      date: evt.date,
      date_end: evt.date_end,
      date_start: evt.date_start,
      type_event: evt.type_event,
      text_color: '#fff',
 
    }));
    console.log(eventosConColor);
  }

  handleDateClick(arg: any) {
    // Lógica para el manejo de clic en la fecha
  }

  handleEventClick(arg: any) {
    this.selectedEvent = arg.event._def.extendedProps;
    this.visible = true;
  }

  listener() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('height', '100vh');
    document.querySelector('.fc-next-button')?.addEventListener('click', async () => {
      this.initialDate = format(new Date(calendarApi.getCurrentData().viewApi.activeStart), 'yyyy-MM-dd 00:00');
      this.lastDateOfMonth = format(new Date(calendarApi.getCurrentData().viewApi.activeEnd), 'yyyy-MM-dd 23:59');

      await this.getEvents();
    });

    document.querySelector('.fc-prev-button')?.addEventListener('click', async () => {
      this.initialDate = format(new Date(calendarApi.getCurrentData().viewApi.activeStart), 'yyyy-MM-dd 00:00');
      this.lastDateOfMonth = format(new Date(calendarApi.getCurrentData().viewApi.activeEnd), 'yyyy-MM-dd 23:59');

      await this.getEvents();
    });
  }

  showDialog(event: any) {
    this.selectedEvent = event._def.extendedProps;
    this.visible = true;
  }

  renderEventContent(arg: any) {
    const event = arg.event;
    const backgroundColor = event.backgroundColor || event.extendedProps.color;
    const title = event.title;
    const div = document.createElement('div');
    div.setAttribute('data-toggle', 'modal');
    div.setAttribute('data-target', '#modalEvent');
    div.setAttribute('style', `background-color: ${backgroundColor}; padding: 5px; border-radius: 5px; cursor: pointer;`);
    div.textContent = title;
    div.addEventListener('click', () => this.showDialog(event));
    return { domNodes: [div] };
  }
}
