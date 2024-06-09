import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { LdapService } from '../providers/ldap.service';
import { CoreService } from '../providers/core.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastService } from '../providers/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = new FormGroup({
    // userId: new FormControl('040120'),
    // fullName: new FormControl('Leonel Lopez'),
    // email: new FormControl('leonel.lopez19@itca.edu.sv'),
    // careerId: new FormControl(''),
    // userPassword: new FormControl('12345'),
    userId: new FormControl(''),
    fullName: new FormControl(''),
    email: new FormControl(''),
    careerId: new FormControl(''),
    userPassword: new FormControl(''),
  });
  careers: Array<Object>;

  @ViewChild("content", { static: false }) content: TemplateRef<any>;

  constructor(private ldapService: LdapService, private coreService: CoreService, private toastService: ToastService, private modalService: NgbModal, private router: Router) { }

  async ngOnInit() {
    const userJson = localStorage.getItem('user')
    const userName = localStorage.getItem('userName') || ''
    const usuario = userJson ? JSON.parse(userJson) : null;

    if (userName) {
      const windows: any = window;
      // windows.location = '/'
      this.router.navigate(['/'])
    }

    let params = this.coreService.setParams({ itemsPerPage: -1 })

    const response: any = await this.coreService.get('/career', params)

    this.careers = response.data;
  }

  register = async () => {
    try {
      if (!this.user.value.careerId || !this.user.value.fullName || !this.user.value.email || !this.user.value.userPassword) {
        const opt = this.toastService.options('danger', '¡Ops..!');
        this.toastService.show("Campos requeridos", opt);
        return;
      }

      const response: any = await this.ldapService.post('/add-user', this.user.value)

      this.modalService.open(this.content, {
        ariaLabelledBy: "modal-basic-title", size: "lg", windowClass: 'showBet', backdrop: 'static', centered: true,
        keyboard: false,
      });
    } catch (error: any) {
      const opt = this.toastService.options('danger', '¡Ops..!');
      this.toastService.show("Credenciales Invalidas", opt);

      throw new Error(error.message)
    }
  }

  redirectTo = (to: String) => {

    if (to == 'portal') {
      const windows: any = window;
      windows.location = 'http://192.168.40.1'
    } else {
      this.modalService.dismissAll()
      this.router.navigate(['/login'])
    }
  }

}
