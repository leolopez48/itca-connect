import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { EventTypeService } from '../../providers/event-type.service';
import { IEvent } from '../../../../model/event.interface';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.scss'
})
export class EventEditComponent implements OnInit{
  eventoForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() eventSelected: IEvent;
  @Output() modalClosed = new EventEmitter<any>();
  eventType:any;
  usuarioLogueado:any;
  accionesPersonales:any
  accionesPersonalesSelected:any;
  selectedProgramados!: any;
  minDate!:Date;

  constructor( public activeModal: NgbActiveModal,private eventService:EventCrudService,private eventTypeService:EventTypeService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.eventSelected);
    this.eventoForm = this.fb.group({
      id: null,
      name: ['',[Validators.required]],
      date_start: ['',[Validators.required]],
      date_end: ['',[Validators.required]],
      type_event: ['',[Validators.required]],
    });
    this.getTypeEvent();
    if(this.tipoAccion!=0){
      this.modificarProgramado();
    }
  }
  onSubmit(){
    this.loading=true;
    let inicio = this.formatearFechaYHora(this.eventoForm.value.date_start);
    let fin = this.formatearFechaYHora(this.eventoForm.value.date_end);
    this.eventoForm.value.date_start = inicio;
    this.eventoForm.value.date_end = fin;
    console.log(this.eventoForm.value)
    
    if(this.tipoAccion==0){
      this.eventService.Create(this.eventoForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.close(true);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }, 
      });
    }else{
       this.updateProgramado();
      this.loading = false;
    }
   
  }

  getTypeEvent(){
    this.eventTypeService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.eventType=res.data;
      },
      error: (err) => {
        console.log(err);
      }, 
    });
  }

  modificarProgramado(){
      var fechaInicio= new Date(this.eventSelected.date_start?? "");
      var fechaFin= new Date(this.eventSelected.date_end?? "");

      this.eventoForm.get('id')?.setValue(this.eventSelected.id);
      this.eventoForm.get('name')?.setValue(this.eventSelected.name);
      this.eventoForm.get('date_start')?.setValue(fechaInicio);
      this.eventoForm.get('date_end')?.setValue(fechaFin);
      this.eventoForm.get('type_event')?.setValue(this.eventSelected.type_event_id);
    }
  

  updateProgramado(){
      console.log('Modificando');
      this.eventService.Edit(this.eventoForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.crearNuevo();
          this.close(true);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
    }

  selectedAccion($event:any){

  }

  formatearFechaYHora(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')?? '';
  }

  crearNuevo(){
    this.eventoForm.reset();
  }

  close(dataToReturn: any) {
    this.modalClosed.emit(dataToReturn); 
    this.activeModal.close(); 
  }


}
