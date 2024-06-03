import { Injectable } from "@angular/core";
import Http from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class LdapService extends Http {
  baseUrl = 'http://192.168.1.253:8002/spring-embedded-ldap'

  super() { }
}