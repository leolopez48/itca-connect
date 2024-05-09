import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { EventTypeService } from '../../providers/event-type.service';
import { IEvent, IPlaceType } from '../../../../model/event.interface';
import { CampusService } from '../../providers/campus.service';
import { PlaceTypeService } from '../../providers/place-type.service';
interface Icon {
  name: string;
  value: string;
}
@Component({
  selector: 'app-place-type-edit',
  templateUrl: './place-type-edit.component.html',
  styleUrl: './place-type-edit.component.scss'
})
export class PlaceTypeEditComponent implements OnInit{
  placeTypesForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() placeSelected: IPlaceType;
  @Output() modalClosed = new EventEmitter<any>();
  campus:any;
  usuarioLogueado:any;
  icons: Icon[] = [
    { name: 'Map', value: 'pi pi-map' },
    { name: 'Bookmark', value: 'pi pi-bookmark' },
    { name: 'Search', value: 'pi pi-search' },
    { name: 'Plus', value: 'pi pi-plus' },
    { name: 'Minus', value: 'pi pi-minus' },
    { name: 'Home', value: 'pi pi-home' },
    { name: 'Calendar', value: 'pi pi-calendar' },
    { name: 'Bell', value: 'pi pi-bell' },
    { name: 'Star', value: 'pi pi-star' },
    { name: 'User', value: 'pi pi-user' },
    { name: 'Cog', value: 'pi pi-cog' },
    { name: 'Briefcase', value: 'pi pi-briefcase' },
    { name: 'Check', value: 'pi pi-check' },
    { name: 'Times', value: 'pi pi-times' },
    { name: 'Angle Down', value: 'pi pi-angle-down' },
    { name: 'Angle Left', value: 'pi pi-angle-left' },
    { name: 'Angle Right', value: 'pi pi-angle-right' },
    { name: 'Angle Up', value: 'pi pi-angle-up' },
    { name: 'External Link', value: 'pi pi-external-link' },
    { name: 'Exclamation Circle', value: 'pi pi-exclamation-circle' },
    { name: 'Exclamation Triangle', value: 'pi pi-exclamation-triangle' },
    { name: 'Info Circle', value: 'pi pi-info-circle' },
    { name: 'Question Circle', value: 'pi pi-question-circle' },
    { name: 'Trash', value: 'pi pi-trash' },
    { name: 'Thumbs Up', value: 'pi pi-thumbs-up' },
    { name: 'Thumbs Down', value: 'pi pi-thumbs-down' },
  ];
  selectedIcon: string;
  constructor( public activeModal: NgbActiveModal,private placeService:PlaceTypeService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.placeSelected);
    this.placeTypesForm = this.fb.group({
      id: null,
      name: ['',[Validators.required]],
      icon: ['',[Validators.required]],
    });
    if(this.tipoAccion!=0){
      console.log('paso');
      this.modificarProgramado();
    }
    
  }
  onSubmit(){
    this.loading=true;
    console.log(this.placeTypesForm.value)

    if(this.tipoAccion==0){
      this.placeService.Create(this.placeTypesForm.value).subscribe({
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
      this.placeTypesForm.get('id')?.setValue(this.placeSelected.id);
      this.placeTypesForm.get('name')?.setValue(this.placeSelected.name);
      this.placeTypesForm.get('icon')?.setValue(this.placeSelected.icon);
    }


  updateProgramado(){
      console.log('Modificando');
      this.placeService.Edit(this.placeTypesForm.value).subscribe({
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
    this.placeTypesForm.reset();
  }

  close(dataToReturn: any) {
    this.modalClosed.emit(dataToReturn);
    this.activeModal.close();
  }

  getSelectedIconClass(): string {
    if (this.placeTypesForm && this.placeTypesForm.get('icon')) {
      const selectedIconValue = this.placeTypesForm.get('icon')!.value;
      
      // Check if selectedIconValue is truthy, return it; otherwise, return an empty string
      return selectedIconValue ? selectedIconValue : '';
    } else {
      // Return an empty string if placeTypesForm or its 'icon' control is null or undefined
      return '';
    }
  }


}
