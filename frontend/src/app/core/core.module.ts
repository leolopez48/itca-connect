import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreService } from './providers/core.service';
import { AuthService } from './providers/auth.service';
import { LdapService } from './providers/ldap.service';
import { DruidService } from './providers/druid.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  providers: [
    CoreService,
    AuthService,
    LdapService,
    DruidService
  ]
})
export class CoreModule { }
