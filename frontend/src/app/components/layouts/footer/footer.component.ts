import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  fechaActual!: number;
  anio:Date = new Date();
  ngOnInit(): void {
   
    this.fechaActual=this.anio.getFullYear();
  }
}
