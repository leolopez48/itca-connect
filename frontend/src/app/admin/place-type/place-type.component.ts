import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../core/providers/toast.service";
import {CampusService} from "../providers/campus.service";
import {DatePipe} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {IEvent, IPlaceType} from "../../../model/event.interface";
import {CampusEditComponent} from "../campus/campus-edit/campus-edit.component";
import {PlaceTypeService} from "../providers/place-type.service";
import { PlaceTypeEditComponent } from './place-type-edit/place-type-edit.component';

@Component({
  selector: 'app-place-type',
  standalone: true,
    imports: [
        ButtonModule,
        ConfirmDialogModule,
        SharedModule,
        TableModule
    ],
  templateUrl: './place-type.component.html',
  styleUrl: './place-type.component.scss'
})
export class PlaceTypeComponent {
  loading:boolean=false;
  // @Input() usuario: any;
  usuarioLogueado:any;
  placesType!:any[];

  accionesPersonales:any
  accionesPersonalesSelected:any;
  selectedProgramados!: any;
  minDate!:Date;
  banderaAccion: number=0;
  activeIndex:number=0;
  constructor( public activeModal: NgbActiveModal,private modalService:NgbModal,private toastService:ToastService,private placeTypeService:PlaceTypeService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder,private confirmationService: ConfirmationService){
  }

  ngOnInit(){
    this.getPlaces();
  }

  getPlaces(){
    this.placeTypeService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.placesType=res.data;

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

  deletePlacesType(id:any){
    console.log(id);
    this.placeTypeService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getPlaces();
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

  editPlacesType(model:any){
    console.log(model);
    const Selected: IPlaceType = {
      id: model.id,
      name: model.name,
      icon: model.icon
    };

    const dialogRefBs = this.modalService.open(PlaceTypeEditComponent,
      { ariaLabelledBy: "modal-basic-title", size: "lg", centered: true,
        windowClass: 'showBet bg-modal',
        backdrop: "static", });
    dialogRefBs.componentInstance.tipoAccion = 1;
    dialogRefBs.componentInstance.placeSelected = Selected;
    dialogRefBs.componentInstance.modalClosed.subscribe((data:any) => {
      console.log(data);
      if (data) {
        const opt = this.toastService.options('success', '¡Exito!');
        this.toastService.show("Se modificó con exito!", opt);
      }
      this.getPlaces();
    });
  }

  crearNuevo(){
    const dialogRefBs = this.modalService.open(PlaceTypeEditComponent,
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
      this.getPlaces();
    });
  }

  confirm(event:any,data:any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres borrar este registro?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "SI",
      rejectLabel: "NO",
      dismissableMask: true,
      accept: () => {
        this.deletePlacesType(data.id)
        const opt = this.toastService.options('success', '¡Exito!');
        this.toastService.show("Se elimino con exito!", opt);
      },
      reject: () => {
        // console.log('se rechazo');
      }
    });
  }
}
