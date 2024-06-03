import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { LdapService } from '../providers/ldap.service';
import { CoreService } from '../providers/core.service';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastService } from '../providers/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = new FormGroup({
    userId: new FormControl('040120'),
    fullName: new FormControl('Leonel Lopez'),
    email: new FormControl('leonel.lopez19@itca.edu.sv'),
    careerId: new FormControl(''),
    userPassword: new FormControl('12345'),
  });
  careers: Array<Object>;

  constructor(private ldapService: LdapService, private coreService: CoreService, private toastService: ToastService) { }

  async ngOnInit() {
    const userJson = localStorage.getItem('user')
    const userName = localStorage.getItem('userName') || ''
    const usuario = userJson ? JSON.parse(userJson) : null;

    if (userName) {
      const windows: any = window;
      windows.location = '/'
    }

    let params = this.coreService.setParams({ itemsPerPage: -1 })

    const response: any = await this.coreService.get('/career', params)

    this.careers = response.data;
  }

  register = async () => {

    try {
      if (!this.user.value.careerId) {
        const opt = this.toastService.options('danger', '¡Ops..!');
        this.toastService.show("Debes seleccionar una carrera", opt);
        return;
      }

      const response: any = await this.ldapService.post('/add-user', this.user.value)

      console.log(response)

      const windows: any = window;
      windows.location = '192.168.40.1'
    } catch (error: any) {
      const opt = this.toastService.options('danger', '¡Ops..!');
      this.toastService.show("Credenciales Invalidas", opt);

      throw new Error(error.message)
    }
  }
}
