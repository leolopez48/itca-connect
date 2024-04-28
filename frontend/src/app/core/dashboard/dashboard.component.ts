import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  cards:any[];

  constructor(){
    this.cards = [
      {
        title: 'Traffic',
        value: '350,897',
        icon: 'fas fa-chart-bar',
        percentage: '3.48%',
        since: 'Since last month'
      },
      {
        title: 'Traffic',
        value: '350,897',
        icon: 'fas fa-chart-bar',
        percentage: '3.48%',
        since: 'Since last month'
      },
      {
        title: 'Traffic',
        value: '350,897',
        icon: 'fas fa-chart-bar',
        percentage: '3.48%',
        since: 'Since last month'
      },
      {
        title: 'Traffic',
        value: '350,897',
        icon: 'fas fa-chart-bar',
        percentage: '3.48%',
        since: 'Since last month'
      }
     
    ];
  }
  ngOnInit() {

  }
}
