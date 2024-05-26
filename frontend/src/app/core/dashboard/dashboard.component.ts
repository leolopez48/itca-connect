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
  isloading:boolean=false;
  sites: any[] = []

  constructor(private druidService: DruidService) { }

  ngOnInit(): void {
    this.createBarChart();
    this.createPieChart();
    this.createLineChart();
    this.getTotals();
    this.latestSites();
    
  }

  async getTotals() {
    this.isloading=true;
    let response = await this.druidService.query('select count(*) as total from "itca-connect-postgres-sitios"')

    this.cards[0].value = response[0].total;

    response = await this.druidService.query('select count(*) as total from "itca-connect-postgres-analisis"')

    this.cards[1].value = response[0].total;
    this.isloading=false;
  }

  async createBarChart() {
    try {
      this.isloading = true;
    const ctx = document.getElementById('BarChart') as HTMLCanvasElement;
    const labels:any = []; 
    const data:any = []; 
    const response = await this.druidService.query('SELECT tema, COUNT(*) AS num_busquedas FROM "itca-connect-postgres-analisis" GROUP BY tema ORDER BY num_busquedas DESC LIMIT 7');
  
   response.forEach((result:any) => {
      labels.push(result.tema); // Agrega el tema como etiqueta
      data.push(result.num_busquedas); // Agrega el número de búsquedas como dato
    });
    // console.log(response);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // labels como etiquetas
        datasets: [{
          label: '# Temas más Populares',
          data: data, // datos
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
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

    } catch (error) {
      console.error('Error al obtener los datos:', error); 
    }finally{
      this.isloading = false;
    }
    
  }

  async createLineChart() {
    try {
      this.isloading=true;
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
    } catch (error) {
      console.error('Error al obtener los datos:', error); 
    } finally{
      this.isloading=false;
    }

   
  }

  async latestSites() {
    this.isloading=true;
    const response = await this.druidService.query(`select * from "itca-connect-postgres-analisis" analisis  JOIN "itca-connect-postgres-sitios" sitios ON analisis.sitio_id = sitios.id  ORDER BY analisis.__time DESC LIMIT 100`)
    this.sites = response
    console.log(response);
    this.isloading=false;
  }

  async createPieChart() {
    try {
      this.isloading = true; // Indicar que se está cargando
  
      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      const labels: string[] = [];
      const data: number[] = [];
      const backgroundColors: string[] = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ];
      const borderColors: string[] = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ];
  
      const response = await this.druidService.query(`SELECT REGEXP_EXTRACT(url,'^https?://(?:www\.)?([^/?#]+)' , 1) AS dominio, COUNT(*) AS num_visitas FROM "itca-connect-postgres-sitios" GROUP BY REGEXP_EXTRACT(url, '^https?://(?:www\.)?([^/?#]+)', 1) ORDER BY num_visitas DESC limit 5`);
  
      response.forEach((result: any, index: number) => {
        labels.push(result.dominio);
        data.push(result.num_visitas);
      });
  
      // Crear el gráfico de pie
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels, // Etiquetas
          datasets: [{
            label: '# de veces buscado',
            data: data, // Datos
            backgroundColor: backgroundColors.slice(0, data.length),
            borderColor: borderColors.slice(0, data.length),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error); // Manejar errores de consulta
    } finally {
      this.isloading = false; // Indicar que se ha completado la carga, independientemente de si hay un error o no
    }
  }
  
}
