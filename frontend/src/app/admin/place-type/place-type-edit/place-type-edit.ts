import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { EventTypeService } from '../../providers/event-type.service';
import { IEvent } from '../../../../model/event.interface';
import { CampusService } from '../../providers/campus.service';

@Component({
  selector: 'app-place-type-edit',
  templateUrl: './place-type-edit.component.html',
  styleUrl: './place-type-edit.scss'
})
export class PlaceTypeEditComponent implements OnInit{
  campusForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() eventSelected: IEvent;
  @Output() modalClosed = new EventEmitter<any>();
  campus:any;
  usuarioLogueado:any;

  constructor( public activeModal: NgbActiveModal,private campuService:CampusService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.eventSelected);
    this.campusForm = this.fb.group({
      id: null,
      name: ['',[Validators.required]],
    });
    if(this.tipoAccion!=0){
      console.log('paso');
      this.modificarProgramado();
    }
  }
  onSubmit(){
    this.loading=true;
    console.log(this.campusForm.value)

    if(this.tipoAccion==0){
      this.campuService.Create(this.campusForm.value).subscribe({
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

  modificarProgramado(){
      var fechaInicio= new Date(this.eventSelected.date_start?? "");
      var fechaFin= new Date(this.eventSelected.date_end?? "");

      this.campusForm.get('id')?.setValue(this.eventSelected.id);
      this.campusForm.get('name')?.setValue(this.eventSelected.name);
    }


  updateProgramado(){
      console.log('Modificando');
      this.campuService.Edit(this.campusForm.value).subscribe({
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
    this.campusForm.reset();
  }

  close(dataToReturn: any) {
    this.modalClosed.emit(dataToReturn);
    this.activeModal.close();
  }


}
