import { Injectable } from "@angular/core";
import Http from "./http.service";
@Injectable({
    providedIn: 'root'
  })
export class LdapService extends Http {
    baseUrl = 'http://64.23.242.28:8002/spring-embedded-ldap'

    super() { }
}