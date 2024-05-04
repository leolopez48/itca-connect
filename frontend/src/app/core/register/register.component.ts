import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CoreService } from '../providers/core.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, DropdownModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = new FormGroup({
    name: new FormControl(''),
    carnet: new FormControl(''),
    email: new FormControl(''),
    career: new FormControl(''),
    password: new FormControl(''),
  });
  careers: Array<Object>;

  constructor(private coreService: CoreService) { }

  async ngOnInit() {
    let params = this.coreService.setParams({ itemsPerPage: -1 })

    const response: any = await this.coreService.get('/career', params)

    this.careers = response.data;
  }

  register = () => {
    console.log(this.user.value)
  }
}
