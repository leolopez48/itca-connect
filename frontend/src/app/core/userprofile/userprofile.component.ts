import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../providers/toast.service';
import { AuthUserService } from '../providers/authUser.service';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, FormsModule, PasswordModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  formUser!: FormGroup;
  NewPassword: any;
  usuarioCarnet: any;
  rol: any = '';
  accessToken: any;
  constructor(private fb: FormBuilder, private toastService: ToastService, private authService: AuthUserService) {
    this.usuarioCarnet = localStorage.getItem('userName') || '{}';
    this.rol = localStorage.getItem('role') || '{}';

    this.createForms();
  }

  createForms() {
    this.formUser = this.fb.group({
      password: ['', [Validators.required]]
    });
  }


  changePassword() {
    if (this.formUser.valid) {
      const password = this.formUser.value.password;
      this.authService.ActualizarInfo(password)
        .subscribe(
          response => {
            // console.log(response);
            const opt = this.toastService.options('success', '¡Exito!');
            this.toastService.show("Se actualizo exitosamente!", opt);
          },
          error => {
            console.log(error);
            const opt = this.toastService.options('danger', 'Error');
            this.toastService.show('Error al actualizar la contraseña', opt);
          }
        );
    }
  }

}


