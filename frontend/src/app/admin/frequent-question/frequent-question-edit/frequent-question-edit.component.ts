import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventCrudService } from '../../providers/event-crud.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { EventTypeService } from '../../providers/event-type.service';
import { IEvent, IFrequentQuestion } from '../../../../model/event.interface';
import { CampusService } from '../../providers/campus.service';
import { FrequentQuestionService } from '../../providers/frequent-question.service';

@Component({
  selector: 'app-frequent-question-edit',
  templateUrl: './frequent-question-edit.component.html',
  styleUrl: './frequent-question-edit.component.scss'
})
export class QuestionEditComponent implements OnInit{
  questionForm!: FormGroup;
  loading:boolean=false;
  @Input() tipoAccion: any;
  @Input() eventSelected: IFrequentQuestion;
  @Output() modalClosed = new EventEmitter<any>();
  campus:any;
  usuarioLogueado:any;

  constructor( public activeModal: NgbActiveModal,private frequentService:FrequentQuestionService, public datePipe:DatePipe, private fb:FormBuilder){

  }
  ngOnInit(): void {
    console.log(this.tipoAccion);
    console.log(this.eventSelected);
    this.questionForm = this.fb.group({
      id: null,
      question: ['',[Validators.required]],
      answer: ['',[Validators.required]],
    });
    if(this.tipoAccion!=0){
      this.modificarProgramado();
    }
  }
  onSubmit(){
    this.loading=true;
    console.log(this.questionForm.value)
    
    if(this.tipoAccion==0){
      this.frequentService.Create(this.questionForm.value).subscribe({
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
      this.questionForm.get('id')?.setValue(this.eventSelected.id);
      this.questionForm.get('question')?.setValue(this.eventSelected.question);
      this.questionForm.get('answer')?.setValue(this.eventSelected.answer);
    }
  

  updateProgramado(){
      console.log('Modificando');
      this.frequentService.Edit(this.questionForm.value).subscribe({
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
//
  }

  crearNuevo(){
    this.questionForm.reset();
  }

  close(dataToReturn: any) {
    this.modalClosed.emit(dataToReturn); 
    this.activeModal.close(); 
  }


}
