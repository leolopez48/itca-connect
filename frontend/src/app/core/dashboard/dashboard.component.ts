import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DruidService } from '../providers/druid.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  cards: any[] = [
    {
      title: 'Sitios totales',
      value: '350,897',
      icon: 'pi pi-arrow-up',
      percentage: '3.48%',
      since: 'Since last month'
    },
    {
      title: 'Sitios analizados',
      value: '350,897',
      icon: 'pi pi-list',
      percentage: '3.48%',
      since: 'Since last month'
    },
  ];

  sites: any[] = []

  constructor(private druidService: DruidService) { }

  ngOnInit(): void {
    // this.createBarChart();
    // this.createPieChart();
    this.createLineChart();
    this.getTotals()
    this.latestSites()
  }

  async getTotals() {
    let response = await this.druidService.query('select count(*) as total from "itca-connect-postgres-sitios"')

    this.cards[0].value = response[0].total;

    response = await this.druidService.query('select count(*) as total from "itca-connect-postgres-analisis"')

    this.cards[1].value = response[0].total;




    // console.log(this.cards)
  }

  createBarChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# de Sitios',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  async createLineChart() {

    const data = []
    for (let index = 1; index <= 12; index++) {
      const numberMonth = (index < 10) ? `0${index}` : index;

      const response = await this.druidService.query(`select count(*) as total from "itca-connect-postgres-analisis" where __time like '2024-${numberMonth}-%'`)

      data.push(response[0].total)
    }

    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Sitios por mes',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  async latestSites() {
    const response = await this.druidService.query(`select * from "itca-connect-postgres-analisis" analisis  JOIN "itca-connect-postgres-sitios" sitios ON analisis.sitio_id = sitios.id  ORDER BY analisis.__time DESC LIMIT 100`)

    this.sites = response
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
