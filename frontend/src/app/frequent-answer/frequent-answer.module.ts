import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrequentRoutingModule } from './frequent-routing.module';
import { CoreService } from '../core/providers/core.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FrequentRoutingModule,
  ],
  providers: [
    CoreService
  ]
})
export class FrequentAnswerModule {

}
