import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./search/search.component";
import { AnalyzeRoutingModule } from "./analyze-routing.module";
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  providers: []
})
export class AnalyzeModule {
}
