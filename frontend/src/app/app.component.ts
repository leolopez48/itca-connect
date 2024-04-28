import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SidebarService } from './core/providers/sidebar.service';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/layouts/sidenav/sidenav.component';
import { ToastsContainer } from './core/providers/toasts-container.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
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
  providers: [MessageService]
})
export class AppComponent {
  title = 'itca-connect-front';
  @ViewChild('main') main: ElementRef;
  isMainMinimized: boolean = false;

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService,private renderer: Renderer2) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }


}


