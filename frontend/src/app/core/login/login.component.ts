import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CoreService } from '../providers/core.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private coreService: CoreService) { }

  login = async () => {
    console.log(this.credentials.value)
    // const response = await this.coreService.post('/authenticate', this.credentials.value)

    // console.log(response)
  }
}
