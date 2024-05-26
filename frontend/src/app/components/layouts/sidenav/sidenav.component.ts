import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../../../core/providers/sidebar.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  isSidebarVisible = false;
  isSubmenuOpen = false;
  isLoggedIn = false;  // Añadir esta propiedad
  selectedMenuItem: string = '';

  constructor(private sidebarService: SidebarService, private router: Router,) { }

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
    this.verificarSubMenu();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // console.log(event);
      this.setSelectedMenuItem(event.urlAfterRedirects);
    });

    // Verificar si el usuario está en sesión
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar();
  }

  verificarSubMenu() {
    const bandera = localStorage.getItem('sidebarSubMenu') || null;
    console.log(bandera);
    if (bandera != null && bandera == 'true')
      this.isSubmenuOpen = true
    else
      this.isSubmenuOpen = false
  }

  toggleSubmenu() {
    localStorage.removeItem('sidebarSubMenu');
    localStorage.setItem('sidebarSubMenu', '' + !this.isSubmenuOpen);
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  // Establecer el elemento seleccionado en base a la ruta actual
  setSelectedMenuItem(url: string) {
    if (url.includes('/calendar')) {
      this.selectedMenuItem = 'calendar';
    } else if (url.includes('/map')) {
      this.selectedMenuItem = 'map';
    } else if (url.includes('/chat')) {
      this.selectedMenuItem = 'chat';
    } else if (url.includes('/stats')) {
      this.selectedMenuItem = 'stats';
    } else if (url.includes('/notification')) {
      this.selectedMenuItem = 'notification';
    } else if (url.includes('/analyze')) {
      this.selectedMenuItem = 'analyze';
    } else if (url.includes('/admin/events')) {
      this.selectedMenuItem = 'admin-events';
    } else if (url.includes('/admin/type-events')) {
      this.selectedMenuItem = 'admin-type-events';
    } else if (url.includes('/admin/campus')) {
      this.selectedMenuItem = 'admin-campus';
    } else if (url.includes('/admin/school')) {
      this.selectedMenuItem = 'admin-school';
    } else if (url.includes('/admin/frequent-question')) {
      this.selectedMenuItem = 'admin-frequent-question';
    } else if (url.includes('/admin/detail-campus-places')) {
      this.selectedMenuItem = 'admin-detail-campus-places';
    } else if (url.includes('/admin/places-type')) {
      this.selectedMenuItem = 'admin-places-type';
    } else if (url.includes('/')) {
      this.selectedMenuItem = 'home';
    }
    else {
      // Si no coincide con ninguna de las rutas anteriores, establece el elemento del menú seleccionado como vacío o como desees manejarlo
      this.selectedMenuItem = '';
    }
  }

}
