import { Component, NgModule, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreService } from '../core/providers/core.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NotificationService } from '../core/providers/notification.service';
import { ToastService } from '../core/providers/toast.service';

interface Filtros {
  name: string;
  code: string;
}
@Component({
  selector: 'app-notification',
  standalone: false,
  // imports: [
  //   InputGroupModule,
  //   InputGroupAddonModule,
  //   InputTextareaModule,
  //   DropdownModule,
  //   FormsModule,
  //   ButtonModule,
  //   TableModule,
  //   ReactiveFormsModule
  // ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  filtros: Filtros[] | undefined = [
    { name: 'Persona', code: 'person' },
    { name: 'Carrera', code: 'career' },
    { name: 'Todos', code: 'all' },
  ];

  filtroSeleccionado: Filtros | undefined = {
    name: '',
    code: ''
  };
  title: FormControl = new FormControl('')
  subject: FormControl = new FormControl('')
  description: FormControl = new FormControl('')
  filterCareer: FormControl = new FormControl('')
  filterPerson: FormControl = new FormControl('')
  careers: any[];
  users: any[]=[];
  disableButton: Boolean = false;

  constructor(private coreService: CoreService,private toastService:ToastService, private notificationService: NotificationService) { }

  async ngOnInit() {
    this.getCareers();
  }

  seleccionarFiltro() {
    this.disableButton = false;
  }

  async getCareers() {
    let params = this.coreService.setParams({ itemsPerPage: -1 })

    const response: any = await this.coreService.get('/career', params)

    this.careers = response.data;
    console.log(this.careers)
  }

  async searchUser() {
    try {
      const filter = this.filtroSeleccionado?.code === 'person' ? this.filterPerson.value : this.filterCareer;

      let params = this.coreService.setParams({ itemsPerPage: -1, search: filter })
      const response: any = await this.coreService.get('/user', params);
      this.users = response.data;
      this.disableButton = true;
    } catch (error: any) {

      this.disableButton = false;
      throw new Error(error)
    }
  }

  nuevaBusqueda(){
    this.disableButton=!this.disableButton;
  }

  async sendNotification() {
    try {
      const listEmails = [];

      switch (this.filtroSeleccionado?.code) {
        case 'person':
          listEmails.push(this.users[0]?.email);
          break;
        case 'career':
          this.users.forEach((user: any) => {
            listEmails.push(user.email);
          });
          break;
        case 'all':
          this.users.forEach((user: any) => {
            listEmails.push(user.email);
          });
          break;
      }
      
      const response: any = await this.notificationService.post('/v2/addListEmailsToQueue', {
        "title": this.title.value,
        "text": this.description.value,
        "subject": this.subject.value,
        "attachments": [],
        "emails": listEmails
      });
      const opt = this.toastService.options('success', '¡Exito!');
      this.toastService.show("Se envio la notificación con exito!", opt);
    } catch (error) {
      const opt = this.toastService.options('danger', '¡Ops..!');
      this.toastService.show("Ocurrio un error: ", opt);
    }
   

  }

}
