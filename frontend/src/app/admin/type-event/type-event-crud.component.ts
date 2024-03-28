import { Component } from '@angular/core';
import { AdminModule } from '../admin.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {MatCardModule} from '@angular/material/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { EventCrudService } from '../providers/event-crud.service';
import { TypeEventEditComponent } from './type-event-edit/type-event-edit.component';
import { IEvent, ITypeEvent } from '../../../model/event.interface';
import { EventTypeService } from '../providers/event-type.service';
import { ToastService } from '../../core/providers/toast.service';


@Component({
  selector: 'app-type-event-crud',
  templateUrl: './type-event-crud.component.html',
  styleUrl: './type-event-crud.component.scss',
})
export class TypeEventCrudComponent {

  loading:boolean=false;
  // @Input() usuario: any;
  usuarioLogueado:any;
  eventos!:any[];

  selectedProgramados!: any;
  activeIndex:number=0;
  constructor( public activeModal: NgbActiveModal,private toastService: ToastService,private modalService:NgbModal,private eventService:EventTypeService, public datePipe:DatePipe, private fb:FormBuilder,private confirmationService: ConfirmationService){
    }

  ngOnInit(){
    this.getTypeEvent();
  }

  getTypeEvent(){
    this.eventService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.eventos=res.data;
        
      },
      error: (err) => {
        console.log(err);
        this.toastService.show(
        'No se pudo obtener los registros',
        {
          classname: 'bg-danger text-light te',
          delay: 3000,
          header: '¡Ha ocurrido un error!'
        });
        }, 
    });
  }

  deleteEvent(id:any){
    console.log(id);
    this.eventService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getTypeEvent();
      },
      error: (err) => {
        console.log(err);
        this.toastService.show(
          err,
          {
            classname: 'bg-danger text-light te',
            delay: 3000,
            header: '¡Ha ocurrido un error!'
          });
      }, 
    });
  }

  editEvent(model:any){
    console.log(model);
    const Selected: ITypeEvent = {
      id: model.id,
      name: model.name,
      color: model.color,
      campus: model.campus,
    };

    const dialogRefBs = this.modalService.open(TypeEventEditComponent,
      { ariaLabelledBy: "modal-basic-title", size: "lg", centered: true,
      windowClass: 'showBet bg-modal',
      backdrop: "static", });
      dialogRefBs.componentInstance.tipoAccion = 1;
      dialogRefBs.componentInstance.eventSelected = Selected;
      dialogRefBs.componentInstance.modalClosed.subscribe((data:any) => {
        console.log(data); 
        if (data) {
          const opt = this.toastService.options('success', '¡Exito!');
          this.toastService.show("Se modificó con exito!", opt);
        }
        this.getTypeEvent();
      });
  }

  crearNuevo(){
    const dialogRefBs = this.modalService.open(TypeEventEditComponent,
      { ariaLabelledBy: "modal-basic-title", size: "lg", centered: true,
      windowClass: 'showBet bg-modal',
      backdrop: "static", });
      dialogRefBs.componentInstance.tipoAccion = 0;
      dialogRefBs.componentInstance.eventSelected = null;
      dialogRefBs.componentInstance.modalClosed.subscribe((data:any) => {
        console.log(data); 
        if (data) {
          const opt = this.toastService.options('success', '¡Exito!');
          this.toastService.show("Se creó con exito!", opt);
        }
        this.getTypeEvent();
      });
  }

  confirm(event:any,data:any){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres borrar este registro?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"SI",
      rejectLabel:"NO",
      dismissableMask:true,
      accept: () => {
        this.deleteEvent(data.id)
        const opt = this.toastService.options('success', '¡Exito!');
        this.toastService.show("Se eliminó con exito!", opt);
      },
      reject: () => {
          // console.log('se rechazo');
      }
  });

 
  }

  



}
