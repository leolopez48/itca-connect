import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastsContainer } from './core/providers/toasts-container.component';
import { ToastModule } from 'primeng/toast';
import { SidenavComponent } from './components/layouts/sidenav/sidenav.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    CommonModule,
    ToastModule,
    ToastsContainer
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService

]
})
export class AppModule {
}
