import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DruidService } from '../../core/providers/druid.service';
import { DataViewModule } from 'primeng/dataview';
import { ToastService } from '../../core/providers/toast.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  sites:any=[];
  sitios:any=[];
  isloading:boolean=false;
  layout:string='list';
  filters: any[] = [
    { name: 'Título', key: 'analisis.titulo' },
    { name: 'Objetivo', key: 'analisis.objetivos' },
    { name: 'Palabra clave', key: 'analisis.palabras_claves' },
    { name: 'Tema', key: 'analisis.tema' },
    { name: 'URL', key: 'sitios.url' },
    { name: 'Análisis', key: 'analisis.analisis' },
  ];
  searched: boolean = false;

  constructor(private fb: FormBuilder, private druidService: DruidService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      key: '',
      searchQuery: ['', [Validators.required]],
    });

    console.log(this.sitios);
  }

  async onSubmit() {
    const opt = this.toastService.options('danger', 'Error');
    
    if (!this.searchForm.value.key || !this.searchForm.value.searchQuery) {
      this.toastService.show("Campos requeridos.", opt);
      return;
    }

    this.searched = true;
    this.isloading=true;

    let query = `select * from "itca-connect-postgres-analisis" analisis  JOIN "itca-connect-postgres-sitios" sitios ON analisis.sitio_id = sitios.id where ${this.searchForm.value.key} like '%${this.searchForm.value.searchQuery}%' ORDER BY analisis.__time DESC LIMIT 30`

    try {
      const response = await this.druidService.query(query);

      this.sites = response;
      console.log(this.sites);
      this.sites.forEach((el:any) => {
        el.__time = new Date(el.__time).toLocaleString('es-ES', {
          timeZone: 'America/El_Salvador'
        })
        el.palabras_claves = el.palabras_claves.split(',')
      })
      this.isloading=false;
    } catch (error: any) {
      this.isloading=false;
      this.toastService.show("Error al realizar la consulta.", opt);
      throw new Error(error)
    }
  }

}
