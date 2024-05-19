import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { LdapService } from '../providers/ldap.service';
import { CoreService } from '../providers/core.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule],
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

  constructor(private ldapService: LdapService, private coreService: CoreService) { }

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
    // try {
    const response: any = await this.ldapService.post('/add-user', this.user.value)

    console.log(response)

    const windows: any = window;
    windows.location = '/login'
    // } catch (error: any) {
    //   throw new Error(error.message)
    // }
  }
}
