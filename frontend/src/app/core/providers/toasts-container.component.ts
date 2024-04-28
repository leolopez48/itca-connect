import { Component, inject } from '@angular/core';

import { ToastService } from './toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [NgbToastModule,NgTemplateOutlet],
	template: `
		@for (toast of toastService.toasts; track toast) {
			<ngb-toast
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
       <div class="d-flex">
    <div class="toast-body">
        <b>{{toast.header}}</b> <br>
       {{toast.textOrTpl}}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
			</ngb-toast>
		}
	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200; padding 30px' },
})
export class ToastsContainer {
	toastService = inject(ToastService);
}