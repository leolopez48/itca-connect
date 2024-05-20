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
  loading: boolean = false;
  sites: any[] = []
  filters: any[] = [
    { name: 'Título', key: 'titulo' },
    { name: 'Objetivo', key: 'objetivos' },
    { name: 'Palabra clave', key: 'palabras_claves' },
    { name: 'Tema', key: 'tema' },
    { name: 'URL', key: 'url' },
    { name: 'Análisis', key: 'analisis' },
  ];
  searched: boolean = false;

  constructor(private fb: FormBuilder, private druidService: DruidService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      key: '',
      searchQuery: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    const opt = this.toastService.options('danger', 'Error');

    if (!this.searchForm.value.key || !this.searchForm.value.searchQuery) {
      this.toastService.show("Campos requeridos.", opt);
      return;
    }

    this.searched = true;
    this.loading = true;

    let query = `select * from "itca-connect-postgres-analisis" analisis  JOIN "itca-connect-postgres-sitios" sitios ON analisis.sitio_id = sitios.id where analisis.${this.searchForm.value.key} like '%${this.searchForm.value.searchQuery}%' ORDER BY analisis.__time DESC LIMIT 30`

    try {
      const response = await this.druidService.query(query);

      console.log(response)

      this.sites = response;

      this.sites.forEach(el => {
        el.__time = new Date(el.__time).toLocaleString('es-ES', {
          timeZone: 'America/El_Salvador'
        })
        el.palabras_claves = el.palabras_claves.split(',')
      })
    } catch (error: any) {

      this.toastService.show("Error al realizar la consulta.", opt);
      throw new Error(error)
    }
  }

}
