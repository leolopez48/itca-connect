import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ToastsContainer } from './core/providers/toasts-container.component';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), provideAnimationsAsync('noop'), provideHttpClient(), MessageService, ToastsContainer, DatePipe]

};
