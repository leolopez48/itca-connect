import { Component, NgModule, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

interface Filtros {
  name: string;
  code: string;
}
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent{
  filtros: Filtros[] | undefined;

  filtroSeleccionado: Filtros | undefined;

  constructor() {}

  async ngOnInit() {
    this.filtros = [
      { name: 'Persona', code: '1' },
      { name: 'Carrera', code: '2' },
      { name: 'Todos', code: '3' },
    ];

    
  }

  seleccionado(){
    console.log(this.filtroSeleccionado);
  }
}
