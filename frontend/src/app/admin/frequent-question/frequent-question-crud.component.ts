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
import { IEvent, IFrequentQuestion } from '../../../model/event.interface';
import { ToastService } from '../../core/providers/toast.service';
import { QuestionEditComponent } from './frequent-question-edit/frequent-question-edit.component';
import { FrequentQuestionService } from '../providers/frequent-question.service';


@Component({
  selector: 'app-frequent-question-crud',
  templateUrl: './frequent-question-crud.component.html',
  styleUrl: './frequent-question-crud.component.scss',
})
export class QuestionCrudComponent {

  loading:boolean=false;
  isloading:boolean=false;
  // @Input() usuario: any;
  usuarioLogueado:any;
  question!:any[];

  accionesPersonales:any
  accionesPersonalesSelected:any;
  selectedProgramados!: any;
  minDate!:Date;
  banderaAccion: number=0;
  activeIndex:number=0;
  constructor( public activeModal: NgbActiveModal,private modalService:NgbModal,private toastService:ToastService,private frequentService:FrequentQuestionService,private messageService:MessageService, public datePipe:DatePipe, private fb:FormBuilder,private confirmationService: ConfirmationService){
    }

  ngOnInit(){
    this.getQuestions();
  }

  getQuestions(){
    this.isloading=true;
    this.frequentService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.question=res.data;
        this.isloading=false;
      },
      error: (err) => {
        console.log(err);
        this.isloading=false;
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

  deleteEvent(id:any){
    console.log(id);
    this.frequentService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getQuestions();
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
    const Selected: IFrequentQuestion = {
      id: model.id,
      question: model.question,
      answer: model.answer,
    };

    const dialogRefBs = this.modalService.open(QuestionEditComponent,
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
        this.getQuestions();
      });
  }

  crearNuevo(){
    const dialogRefBs = this.modalService.open(QuestionEditComponent,
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
        this.getQuestions();
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
      },
      reject: () => {
          // console.log('se rechazo');
      }
  });

 
  }

  



}
