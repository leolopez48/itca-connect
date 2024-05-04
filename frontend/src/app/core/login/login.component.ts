import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = new FormGroup({
    username: new FormControl('040119'),
    password: new FormControl('12345'),
  });

  ngOnInit() {
    const userJson = localStorage.getItem('user')
    const usuario = userJson ? JSON.parse(userJson) : null;

    if (usuario.username) {
      const windows: any = window;
      windows.location = '/'
    }
  }

  constructor(private authService: AuthService, private router: Router) { }

  login = async () => {
    try {
      // console.log(this.credentials.value)
      const response = await this.authService.post('/authenticate', this.credentials.value)

      localStorage.setItem('user', JSON.stringify(response))
      localStorage.setItem('accessToken', response.token)
      localStorage.setItem('role', response.userRoles[0])
      localStorage.setItem('userName', response.username)

      // this.router.navigate(["/"]);
      const windows: any = window;
      windows.location = '/'

      // console.log(response)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
