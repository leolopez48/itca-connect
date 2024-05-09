import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { EventTypeService } from '../../providers/event-type.service';
import { IDetailCampusPlace, IEvent } from '../../../../model/event.interface';
import { DetailCampusPlaceService } from '../../providers/detail-campus-place.service';
import { CampusService } from '../../providers/campus.service';
import { PlaceTypeService } from '../../providers/place-type.service';

@Component({
  selector: 'app-detail-campus-place-edit',
  templateUrl: './detail-campus-place-edit.component.html',
  styleUrl: './detail-campus-place-edit.component.scss'
})
export class DetailCampusPlaceEditComponent implements OnInit{
  detailPlaceForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() eventSelected: IDetailCampusPlace;
  @Output() modalClosed = new EventEmitter<any>();
  placesType:any;
  campus:any;
  usuarioLogueado:any;
  accionesPersonales:any
  accionesPersonalesSelected:any;
  selectedProgramados!: any;
  minDate!:Date;

  constructor( public activeModal: NgbActiveModal,private detailPlaceService:DetailCampusPlaceService,private campuService:CampusService,private placesTypeService:PlaceTypeService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.eventSelected);
    this.detailPlaceForm = this.fb.group({
      id: null,
      longitude: ['',[Validators.required]],
      latitude: ['',[Validators.required]],
      campus_id: ['',[Validators.required]],
      place_type_id: ['',[Validators.required]],
    });
    this.getCampus();
    this.getPlacesType();
    if(this.tipoAccion!=0){
      console.log('paso');
      this.modificarProgramado();
    }
  }
  onSubmit(){
    this.loading=true;
    console.log(this.detailPlaceForm.value)
    
    if(this.tipoAccion==0){
      this.detailPlaceService.Create(this.detailPlaceForm.value).subscribe({
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

  getPlacesType(){
    this.placesTypeService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.placesType=res.data;
      },
      error: (err) => {
        console.log(err);
      }, 
    });
  }

  getCampus(){
    this.campuService.Index().subscribe({
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

      this.detailPlaceForm.get('id')?.setValue(this.eventSelected.id);
      this.detailPlaceForm.get('longitude')?.setValue(this.eventSelected.longitude);
      this.detailPlaceForm.get('latitude')?.setValue(this.eventSelected.latitude);
      this.detailPlaceForm.get('campus_id')?.setValue(this.eventSelected.campus_id);
      this.detailPlaceForm.get('place_type_id')?.setValue(this.eventSelected.place_type_id);
    }
  

  updateProgramado(){
      console.log('Modificando');
      this.detailPlaceService.Edit(this.detailPlaceForm.value).subscribe({
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

  crearNuevo(){
    this.detailPlaceForm.reset();
  }

  close(dataToReturn: any) {
    this.modalClosed.emit(dataToReturn); 
    this.activeModal.close(); 
  }


}
