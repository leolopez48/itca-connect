import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreService } from './providers/core.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  providers: [
    CoreService
  ]
})
export class CoreModule { }
