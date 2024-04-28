import { Injectable, TemplateRef } from '@angular/core';

interface IOptionsConfirm {
  classname: string;
  delay: number;
  header: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  options(severity: string, header: string, delay: number = 3000): IOptionsConfirm  {
    return {
      classname: 'bg-' + severity + ' text-light ng-toast',
      delay: delay,
      header
    }
  }
}
