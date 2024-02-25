import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/layouts/loader/loader.component';

export interface IUser {
  name: string,
  photo: string,
  email: string,
  carnet: string
}

@Component({
  selector: 'chat-user',
  standalone: true,
  imports: [
    LoaderComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  isLoading: Boolean = false;
  users: Array<IUser> = [];

  ngOnInit() {
    this.isLoading = true;

    setTimeout(() => {
      this.users = [
        {
          name: 'Leonel',
          photo: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg',
          email: 'leonel.lopez19@itca.edu.sv',
          carnet: '040119',
        },
        {
          name: 'Leonel 2',
          photo: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg',
          email: 'leonel.lopez19@itca.edu.sv',
          carnet: '040119',
        },
        {
          name: 'Leonel 3',
          photo: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg',
          email: 'leonel.lopez19@itca.edu.sv',
          carnet: '040119',
        },
      ]

      this.isLoading = false;
    }, 500);
  }

  selectUser = (user: IUser): void => {
    console.log(user)
  }

}
