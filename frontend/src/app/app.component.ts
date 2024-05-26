import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarService } from './core/providers/sidebar.service';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SidenavComponent } from './components/layouts/sidenav/sidenav.component';
import { ToastsContainer } from './core/providers/toasts-container.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    CommonModule,
    ToastModule,
    ToastsContainer
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService,  { provide: LocationStrategy, useClass: HashLocationStrategy },]
})
export class AppComponent {
  title = 'itca-connect-front';
  @ViewChild('main') main: ElementRef;
  isMainMinimized: boolean = false;

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService,private renderer: Renderer2,private router: Router,
    private activatedRoute: ActivatedRoute) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
    
    //  // Suscribirse a los eventos de navegación
    //  this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.checkSidebarVisibility();
    // });

    // // Comprobar la visibilidad del sidebar inicialmente
    // this.checkSidebarVisibility();
  }

  // checkSidebarVisibility() {
  //   const currentUrl = this.router.url;
  //   var islogin=true;
  //   if(currentUrl !== 'login')
  //     islogin=false
  //   // this.isSidebarVisible = islogin;
  //   console.log(currentUrl, islogin);
  // }


}


