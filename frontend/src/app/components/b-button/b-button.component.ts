import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-b-button',
  standalone: true,
  imports: [],
  templateUrl: './b-button.component.html',
  styleUrl: './b-button.component.scss'
})
export class BButtonComponent {

  @Input() label: string;

}
