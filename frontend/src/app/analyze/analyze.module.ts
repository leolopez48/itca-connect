import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./search/search.component";
import { AnalyzeRoutingModule } from "./analyze-routing.module";
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DruidService } from '../core/providers/druid.service';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    AnalyzeRoutingModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    DropdownModule
  ],
  providers: [
    DruidService
  ]
})
export class AnalyzeModule {
}
