import { Component, TemplateRef, inject } from '@angular/core';
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
import { IDetailCampusPlace, IEvent } from '../../../model/event.interface';
import { ToastService } from '../../core/providers/toast.service';
import { DetailCampusPlaceEditComponent } from './detail-campus-place-edit/detail-campus-place-edit.component';
import { DetailCampusPlaceService } from '../providers/detail-campus-place.service';


@Component({
  selector: 'app-detail-campus-place',
  templateUrl: './detail-campus-place.component.html',
  styleUrl: './detail-campus-place.component.scss',
})
export class DetailCampusPlaceComponent {

  loading:boolean=false;
  // @Input() usuario: any;
  usuarioLogueado:any;
  detailPlaces!:any[];

  accionesPersonales:any
  accionesPersonalesSelected:any;
  selectedProgramados!: any;
  minDate!:Date;
  banderaAccion: number=0;
  activeIndex:number=0;
  constructor( public activeModal: NgbActiveModal,private modalService:NgbModal,private toastService:ToastService,private detailCampusService:DetailCampusPlaceService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder,private confirmationService: ConfirmationService){
    }

  ngOnInit(){
    this.getDetailPlaces();
  }

  getDetailPlaces(){
    this.detailCampusService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.detailPlaces=res.data;
 
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

  deleteDetailPlace(id:any){
    console.log(id);
    this.detailCampusService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getDetailPlaces();
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

  editDetailPlace(model:any){
    console.log(model);
    const Selected: IDetailCampusPlace = {
      id: model.id,
      longitude: model.longitude,
      latitude: model.latitude,
      campus_id: model.campus,
      place_type_id: model.place_type,
    };

    const dialogRefBs = this.modalService.open(DetailCampusPlaceEditComponent,
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
        this.getDetailPlaces();
      });
  }

  crearNuevo(){
    const dialogRefBs = this.modalService.open(DetailCampusPlaceEditComponent,
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
        this.getDetailPlaces();
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
        this.deleteDetailPlace(data.id)
      },
      reject: () => {
          // console.log('se rechazo');
      }
  });

 
  }

  



}
