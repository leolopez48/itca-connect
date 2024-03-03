import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../providers/api.service';

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

  constructor(private apiService: ApiService) { }

  login = async () => {
    const response = await this.apiService.get('/status');

    console.log(response)
  }
}
