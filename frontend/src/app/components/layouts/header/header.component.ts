import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarService } from '../../../core/providers/sidebar.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any = {
    username: ''
  }

  constructor(private sidebarService: SidebarService, private router: Router) { }

  ngOnInit() {
    const userJson = localStorage.getItem('user')
    const usuario = userJson ? JSON.parse(userJson) : null;

    console.log(localStorage.getItem('userName'))

    this.user = usuario;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout = (e: any) => {
    e.preventDefault();

    localStorage.clear();
    // this.router.navigate(["/login"]);
    const windows: any = window;
    windows.location = '/'
  }
}