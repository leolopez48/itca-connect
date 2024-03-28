import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { IEvent, ISchool } from '../../../../model/event.interface';
import { SchoolService } from '../../providers/school.service';
import { CampusService } from '../../providers/campus.service';
import { ToastService } from '../../../core/providers/toast.service';

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styleUrl: './school-edit.component.scss'
})
export class SchoolEditComponent implements OnInit{
  schoolForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() eventSelected: ISchool;
  @Output() modalClosed = new EventEmitter<any>();
  campus:any;
  usuarioLogueado:any;

  constructor( public activeModal: NgbActiveModal,private toastService:ToastService ,private schoolService:SchoolService,private campusService:CampusService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.eventSelected);
    this.schoolForm = this.fb.group({
      id: null,
      name: ['',[Validators.required]],
      campus: ['',[Validators.required]],
    });
    this.getCampus();
    if(this.tipoAccion!=0){
      this.modificarProgramado();
    }
  }
  onSubmit(){
    this.loading=true;
    console.log(this.schoolForm.value)
    
    if(this.tipoAccion==0){
      this.schoolService.Create(this.schoolForm.value).subscribe({
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
      this.schoolForm.get('id')?.setValue(this.eventSelected.id);
      this.schoolForm.get('name')?.setValue(this.eventSelected.name);
      this.schoolForm.get('campus')?.setValue(this.eventSelected.campus);
    }
  

  updateProgramado(){
      this.schoolService.Edit(this.schoolForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.crearNuevo();
          this.close(true);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
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

  selectedAccion($event:any){

  }

  crearNuevo(){
    this.schoolForm.reset();
  }

  close(dataToReturn: any) {
    this.modalClosed.emit(dataToReturn); 
    this.activeModal.close(); 
  }


}
