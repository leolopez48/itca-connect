import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { EventTypeService } from '../../providers/event-type.service';
import { ITypeEvent } from '../../../../model/event.interface';
import { CampusService } from '../../providers/campus.service';


@Component({
  selector: 'app-event-edit',
  templateUrl: './type-event-edit.component.html',
  styleUrl: './type-event-edit.component.scss'
})
export class TypeEventEditComponent implements OnInit{
  eventoForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() eventSelected: ITypeEvent;
  @Output() modalClosed = new EventEmitter<any>();
  campus:any;
  usuarioLogueado:any;
  accionesPersonales:any
  accionesPersonalesSelected:any;
  selectedProgramados!: any;
  minDate!:Date;
  colores:any;

  constructor( public activeModal: NgbActiveModal,private eventTypeService:EventTypeService,private campusService:CampusService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.eventSelected);
    this.eventoForm = this.fb.group({
      id: null,
      name: ['',[Validators.required]],
      color: ['',[Validators.required]],
      campus_id: ['',[Validators.required]],
    });
    this.getCampus();
    if(this.tipoAccion!=0){
      this.modificarProgramado();
    }

    this.colores = [
      { nombre: 'Rojo', valor: 'red' },
      { nombre: 'Amarillo', valor: 'yellow' },
      { nombre: 'Verde', valor: 'green' },
      { nombre: 'Azul', valor: 'blue' },
      { nombre: 'Negro', valor: 'black' }
  ];
  }
  onSubmit(){
    this.loading=true;
    console.log(this.eventoForm.value)
    
    if(this.tipoAccion==0){
      this.eventTypeService.Create(this.eventoForm.value).subscribe({
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

  getCampus(){
    this.campusService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.campus=res.data;
      },
      error: (err) => {
        console.log(err);
      }, 
    });
  }

  modificarProgramado(){
      this.eventoForm.get('id')?.setValue(this.eventSelected.id);
      this.eventoForm.get('name')?.setValue(this.eventSelected.name);
      this.eventoForm.get('color')?.setValue(this.eventSelected.color);
      this.eventoForm.get('campus_id')?.setValue(this.eventSelected.campus);
    }
  

  updateProgramado(){
      console.log('Modificando');
      this.eventTypeService.Edit(this.eventoForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.crearNuevo();
          this.close(true);
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
