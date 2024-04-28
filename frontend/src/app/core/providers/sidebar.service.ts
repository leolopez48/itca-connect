import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public visible:boolean=true;
  constructor() { 
    this.updateSidebarVisibility();
    window.addEventListener('resize', () => this.updateSidebarVisibility());
  }

  private sidebarVisibilitySubject = new BehaviorSubject<boolean>(this.visible);
  sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();

  toggleSidebar() {
    this.visible = !this.visible;
    this.sidebarVisibilitySubject.next(this.visible);
  }

  private updateSidebarVisibility() {
    if (window.innerWidth < 660) {
      this.visible = false;
    } else {
      this.visible = true;
    }
    this.sidebarVisibilitySubject.next(this.visible);
  }

}
