import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../providers/api.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiService
  ]
})
export class CoreModule { }
